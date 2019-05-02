import { Router, Response } from 'express';

import { compare } from 'bcrypt';
import { pipe, length, lte, gte, allPass } from 'ramda';
import { trim, isEmail, normalizeEmail, isAscii } from 'validator';

import {
    loginUser,
    registerUser,
    resetUserPassword,
    // ResetPasswordRequest,
    RegisterRequest,
    LoginRequest,
} from '../../controllers';
import {
    getUser,
    throwIf,
    ResponseWithUser,
} from '../../middlewares/auth.middleware';

const router = Router();

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

const createNoEmailOrPasswordError = (req, res) => ({
    code: 400,
    message: 'Email and password are required',
});

const createNoEmailPasswordOrConfirmPasswordError = (req, res) => ({
    code: 400,
    message: 'Email, password and confirmPassword are required',
});

const createInvalidEmailError = (req, res) => ({
    code: 400,
    message: 'Invalid email address',
});

const createInvalidPasswordError = (req, res) => ({
    code: 400,
    message:
        'Password has to be between 8 and 50 characters long and include latin letters, numbers and symbols',
});

const createPasswordsNotMatchingError = (req, res) => ({
    code: 400,
    message: 'Passwords must match',
});

const createNotRegisteredError = (req, res) => ({
    code: 400,
    message: `${req.body.email} is not yet registered!`,
});

const createAlreadyRegisteredError = (req, res) => {
    return { code: 400, message: `${req.body.email} already exists!` };
};

const throwIfNoEmailOrPassword = throwIf<LoginRequest, Response>(
    createNoEmailOrPasswordError,
    (req, res) => !req.body.email || !req.body.password
);

const throwIfNoEmailPasswordOrConfirmPassword = throwIf<
    RegisterRequest,
    Response
>(
    createNoEmailPasswordOrConfirmPasswordError,
    (req, res) =>
        !req.body.email || !req.body.password || !req.body.confirmPassword
);

const throwIfInvalidEmail = throwIf<LoginRequest | RegisterRequest, Response>(
    createInvalidEmailError,
    (req, res) => !isEmailValid(req.body.email)
);

const throwIfInvalidPassword = throwIf<
    LoginRequest | RegisterRequest,
    Response
>(
    createInvalidPasswordError,
    (req, res) => !isPasswordValid(req.body.password)
);

const throwIfNoMatchingPasswords = throwIf<RegisterRequest, Response>(
    createPasswordsNotMatchingError,
    (req, res) => req.body.password !== req.body.confirmPassword
);

const throwIfUserExists = throwIf<RegisterRequest, ResponseWithUser>(
    createAlreadyRegisteredError,
    (req, res) => !!res.locals.user
);

const throwIfUserDoesNotExist = throwIf<LoginRequest, ResponseWithUser>(
    createNotRegisteredError,
    (req, res) => !res.locals.user
);

const throwIfIncorrectPassword = throwIf<LoginRequest, ResponseWithUser>(
    (req, res) => ({ code: 400, message: 'Invalid password' }),
    async (req, res) =>
        !(await compare(req.body.password, res.locals.user.password))
);

router.post(
    '/login',
    [
        throwIfNoEmailOrPassword,
        throwIfInvalidEmail,
        throwIfInvalidPassword,
        getUser,
        throwIfUserDoesNotExist,
        throwIfIncorrectPassword,
    ],
    loginUser
);

router.post(
    '/register',
    [
        throwIfNoEmailPasswordOrConfirmPassword,
        throwIfInvalidEmail,
        throwIfInvalidPassword,
        throwIfNoMatchingPasswords,
        getUser,
        throwIfUserExists,
    ],
    registerUser
);

router.post(
    '/reset-password',
    [
        // emailValidator()
        //     // maybe remove this check as it is bad security practise
        //     .custom((value: string, { req }: { req: ResetPasswordRequest }) => {
        //         if (false) {
        //             return Promise.reject('No such user: ' + req.body.email);
        //         }
        //         return Promise.resolve();
        //     }),
        // runValidators,
    ],
    resetUserPassword
);

export default router;
