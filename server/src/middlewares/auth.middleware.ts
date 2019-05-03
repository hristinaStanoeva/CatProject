import { Request, Response, NextFunction } from 'express';
import { compare } from 'bcrypt';
import {
    pipe,
    length,
    lte,
    gte,
    allPass,
    __,
    both,
    min,
    max,
    is,
    ifElse,
    F,
    trim,
    isEmpty,
    isNil,
    either,
    any,
} from 'ramda';
import { isEmail, normalizeEmail, isAscii } from 'validator';

import {
    // ResetPasswordRequest,
    RegisterRequest,
    LoginRequest,
} from '../controllers';
import { createBadRequestError } from '../util/common';

import { CustomLocalsResponse, Middleware, HttpError } from '../models';
import { OperationalError } from '../util/errors';
import { UserEntity } from '../entities/';
import { getUserRepository } from '../entities';

type ResponseWithUser = CustomLocalsResponse<{ user: UserEntity }>;

// TODO: Move to util/common and test!
const isString = is(String);
const hasNoValue = either(isEmpty, isNil);

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

const isEmailValid: (email: string) => boolean = ifElse(
    isString,
    pipe(
        trim,
        normalizeEmail,
        isEmail
    ),
    F
);

const isLengthBetween = (limit1: number, limit2: number) =>
    pipe(
        length,
        both(gte(__, min(limit1, limit2)), lte(__, max(limit1, limit2)))
    );

const isPasswordValid: (password: string) => boolean = ifElse(
    isString,
    pipe(
        trim,
        allPass([isLengthBetween(8, 50), isAscii])
    ),
    F
);

export const throwIfNoEmailOrPassword = throwIf<LoginRequest, Response>(
    (req, res) => createBadRequestError('Email and password are required'),
    (req, res) => any(hasNoValue, [req.body.email, req.body.password])
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
            'Password has to be string between 8 and 50 characters long and include latin letters, numbers and symbols'
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
