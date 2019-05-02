import { Request, Response, NextFunction } from 'express';
import { compare } from 'bcrypt';
import { pipe, length, lte, gte, allPass } from 'ramda';
import { trim, isEmail, normalizeEmail, isAscii } from 'validator';

import {
    // ResetPasswordRequest,
    RegisterRequest,
    LoginRequest,
} from '../controllers';
import { createBadRequestError } from '../util/common';

import { CustomLocalsResponse, Middleware } from '../models';
import { OperationalError } from '../util/errors';
import { UserEntity } from '../entities/';
import { getUserRepository } from '../entities';

type ResponseWithUser = CustomLocalsResponse<{ user: UserEntity }>;
interface HttpError {
    code: number;
    message: string;
}

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

const throwIf = <TReq, TRes>(
    errCallback: Middleware<TReq, TRes, HttpError>,
    predicate: Middleware<TReq, TRes, boolean>
): Middleware<TReq, TRes> => async (
    req: TReq,
    res: TRes,
    next: NextFunction
) => {
    const { code, message } = await errCallback(req, res);
    (await predicate(req, res))
        ? next(new OperationalError(code, message))
        : next();
};

const isEmailValid: (email: string) => boolean = pipe(
    trim,
    normalizeEmail,
    isEmail
);

const isNotTooShort = pipe(
    length,
    lte(8)
);
const isNotTooLong = pipe(
    length,
    gte(50)
);

const isPasswordValid: (password: string) => boolean = pipe(
    trim,
    allPass([isNotTooShort, isNotTooLong, isAscii])
);

export const throwIfNoEmailOrPassword = throwIf<LoginRequest, Response>(
    (req, res) => createBadRequestError('Email and password are required'),
    (req, res) => !req.body.email || !req.body.password
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
        !req.body.email || !req.body.password || !req.body.confirmPassword
);

export const throwIfInvalidEmail = throwIf<
    LoginRequest | RegisterRequest,
    Response
>(
    (req, res) => createBadRequestError('Invalid email address'),
    (req, res) => !isEmailValid(req.body.email)
);

export const throwIfInvalidPassword = throwIf<
    LoginRequest | RegisterRequest,
    Response
>(
    (req, res) =>
        createBadRequestError(
            'Password has to be between 8 and 50 characters long and include latin letters, numbers and symbols'
        ),
    (req, res) => !isPasswordValid(req.body.password)
);

export const throwIfNoMatchingPasswords = throwIf<RegisterRequest, Response>(
    (req, res) => createBadRequestError('Passwords must match'),
    (req, res) => req.body.password !== req.body.confirmPassword
);

export const throwIfUserExists = throwIf<RegisterRequest, ResponseWithUser>(
    (req, res) => createBadRequestError(`${req.body.email} already exists!`),
    (req, res) => !!res.locals.user
);

export const throwIfUserDoesNotExist = throwIf<LoginRequest, ResponseWithUser>(
    (req, res) =>
        createBadRequestError(`${req.body.email} is not yet registered!`),
    (req, res) => !res.locals.user
);

export const throwIfIncorrectPassword = throwIf<LoginRequest, ResponseWithUser>(
    (req, res) => ({ code: 400, message: 'Invalid password' }),
    async (req, res) =>
        !(await compare(req.body.password, res.locals.user.password))
);
