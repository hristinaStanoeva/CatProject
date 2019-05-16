import { Request, Response } from 'express';
import { compare } from 'bcrypt';

import {
    // ResetPasswordRequest,
    RegisterRequest,
    LoginRequest,
} from '../controllers';
import { createBadRequestError, anyHasNoValue } from '../util/common';
import {
    throwIf,
    emailView,
    passwordView,
    confirmPasswordView,
    isReqEmailInvalid,
    isReqPasswordInvalid,
    reqPasswordsAreNotEqual,
    reqHasUser,
    reqHasNoUser,
} from '../util/middleware.utils';

import { CustomLocalsResponse, Middleware } from '../models';
import { UserEntity } from '../entities/';
import { getUserRepository } from '../entities';

// move to separate file
export type ResponseWithUser = CustomLocalsResponse<{ user: UserEntity }>;

export const throwIfNoEmailOrPassword = throwIf<LoginRequest, Response>(
    (req, res) => createBadRequestError('Email and password are required'),
    (req, res) => anyHasNoValue([emailView(req), passwordView(req)])
);

export const throwIfNoEmailPasswordOrConfirmPassword = throwIf<
    RegisterRequest,
    Response
>(
    (req, res) =>
        createBadRequestError(
            'Email, password and confirmPassword are required'
        ),
    (req, res) =>
        anyHasNoValue([
            emailView(req),
            passwordView(req),
            confirmPasswordView(req),
        ])
);

export const throwIfInvalidEmail = throwIf<
    LoginRequest | RegisterRequest,
    Response
>(
    (req, res) => createBadRequestError('Invalid email address'),
    (req, res) => isReqEmailInvalid(req)
);

export const throwIfInvalidPassword = throwIf<
    LoginRequest | RegisterRequest,
    Response
>(
    (req, res) =>
        createBadRequestError(
            'Password has to be string between 8 and 50 characters long and include latin letters, numbers and symbols'
        ),
    (req, res) => isReqPasswordInvalid(req)
);

export const throwIfNoMatchingPasswords = throwIf<RegisterRequest, Response>(
    (req, res) => createBadRequestError('Passwords must match'),
    (req, res) => reqPasswordsAreNotEqual(req)
);

export const throwIfUserExists = throwIf<RegisterRequest, ResponseWithUser>(
    (req, res) => createBadRequestError(`${req.body.email} already exists!`),
    (req, res) => reqHasUser(res)
);

export const throwIfUserDoesNotExist = throwIf<LoginRequest, ResponseWithUser>(
    (req, res) =>
        createBadRequestError(`${req.body.email} is not yet registered!`),
    (req, res) => reqHasNoUser(res)
);

export const throwIfIncorrectPassword = throwIf<LoginRequest, ResponseWithUser>(
    (req, res) => ({ code: 400, message: 'Invalid password' }),
    async (req, res) =>
        !(await compare(req.body.password, res.locals.user.password))
);

export const getUser: Middleware<Request, ResponseWithUser> = async (
    req,
    res,
    next
) => {
    try {
        res.locals.user = await getUserRepository().findOne({
            email: req.body.email,
        });
        return next();
    } catch (e) {
        return next(e);
    }
};
