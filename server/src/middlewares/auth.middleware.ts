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
    lensProp,
    view,
    Lens,
    compose,
    converge,
    equals,
    complement,
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

// move to separate file
export type ResponseWithUser = CustomLocalsResponse<{ user: UserEntity }>;

// TODO: Move to util/common and test with lots of different cases
// For the middleware use onlyfew test cases to see what and when is generated.
const isString = is(String);
const hasNoValue = either(isEmpty, isNil);
const hasValue = complement(hasNoValue);
const anyHasNoValue = (values: any[]) => any(hasNoValue, values);

const bodyLens = lensProp('body');
const emailLens = lensProp('email');
const passwordLens = lensProp('password');
const confirmPasswordLens = lensProp('confirmPassword');

const localsLens = lensProp('locals');
const userLens = lensProp('user');

const emailView: (req: any) => string = view(compose(
    bodyLens,
    emailLens
) as Lens);
const passwordView: (req: any) => string = view(
    // when using compose for lenses, the order is intuitive
    compose(
        bodyLens,
        passwordLens
    ) as Lens /* If casting is not present, TS complains with a strange error even though the code runs without errors. */
);
const confirmPasswordView: (req: any) => string = view(compose(
    bodyLens,
    confirmPasswordLens
) as Lens);

const userView = view(compose(
    localsLens,
    userLens
) as Lens);

const passwordsAreEqual = converge(equals, [passwordView, confirmPasswordView]);
const hasUser = pipe(
    userView,
    both(hasValue, is(UserEntity))
);
const hasNoUser = complement(hasUser);

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
    (req, res) => !isEmailValid(emailView(req))
);

export const throwIfInvalidPassword = throwIf<
    LoginRequest | RegisterRequest,
    Response
>(
    (req, res) =>
        createBadRequestError(
            'Password has to be string between 8 and 50 characters long and include latin letters, numbers and symbols'
        ),
    (req, res) => !isPasswordValid(passwordView(req))
);

export const throwIfNoMatchingPasswords = throwIf<RegisterRequest, Response>(
    (req, res) => createBadRequestError('Passwords must match'),
    (req, res) => !passwordsAreEqual(req)
);

export const throwIfUserExists = throwIf<RegisterRequest, ResponseWithUser>(
    (req, res) => createBadRequestError(`${req.body.email} already exists!`),
    (req, res) => hasUser(res)
);

export const throwIfUserDoesNotExist = throwIf<LoginRequest, ResponseWithUser>(
    (req, res) =>
        createBadRequestError(`${req.body.email} is not yet registered!`),
    (req, res) => hasNoUser(res)
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
