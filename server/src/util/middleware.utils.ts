import { NextFunction } from 'express';
import {
    pipe,
    allPass,
    both,
    is,
    ifElse,
    F,
    trim,
    lensProp,
    view,
    Lens,
    compose,
    converge,
    equals,
    complement,
} from 'ramda';

import { isEmail, normalizeEmail, isAscii } from 'validator';

import { isString, hasValue, isLengthBetween } from './common';
import { OperationalError } from './errors';
import { Middleware, HttpError } from '../models';
import { UserEntity } from '../entities';

export const bodyLens = lensProp('body');
export const emailLens = lensProp('email');
export const passwordLens = lensProp('password');
export const confirmPasswordLens = lensProp('confirmPassword');

export const localsLens = lensProp('locals');
export const userLens = lensProp('user');

export const emailView: (req: any) => string = view(compose(
    bodyLens,
    emailLens
) as Lens);
export const passwordView: (req: any) => string = view(
    // when using compose for lenses, the order is intuitive
    compose(
        bodyLens,
        passwordLens
    ) as Lens /* If casting is not present, TS complains with a strange error even though the code runs without errors. */
);
export const confirmPasswordView: (req: any) => string = view(compose(
    bodyLens,
    confirmPasswordLens
) as Lens);

export const userView = view(compose(
    localsLens,
    userLens
) as Lens);

export const reqPasswordsAreEqual = converge(equals, [
    passwordView,
    confirmPasswordView,
]);
export const reqPasswordsAreNotEqual = complement(reqPasswordsAreEqual);

export const reqHasUser = pipe(
    userView,
    both(hasValue, is(UserEntity))
);
export const reqHasNoUser = complement(reqHasUser);

export const isEmailValid: (email: string) => boolean = ifElse(
    isString,
    pipe(
        trim,
        normalizeEmail,
        isEmail
    ),
    F
);
export const isEmailInvalid = complement(isEmailValid);
export const isReqEmailValid = pipe(
    emailView,
    isEmailValid
);
export const isReqEmailInvalid = complement(isReqEmailValid);

export const isPasswordValid: (password: string) => boolean = ifElse(
    isString,
    pipe(
        trim,
        allPass([isLengthBetween(8, 50), isAscii])
    ),
    F
);
export const isPasswordInvalid = complement(isPasswordValid);
export const isReqPasswordValid = pipe(
    passwordView,
    isPasswordValid
);
export const isReqPasswordInvalid = complement(isReqPasswordValid);

export const throwIf = <TReq, TRes>(
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
