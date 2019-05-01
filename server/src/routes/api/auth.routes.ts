import { Router, Response } from 'express';

import { body } from 'express-validator/check';
import { compare } from 'bcrypt';
import { pipe, length, lte, gte, allPass } from 'ramda';
import { trim, isEmail, normalizeEmail, isAscii } from 'validator';

import {
    loginUser,
    registerUser,
    resetUserPassword,
    ResetPasswordRequest,
    RegisterRequest,
    LoginRequest,
} from '../../controllers';
import { runValidators } from '../../middlewares/run-validators.middleware';
import {
    getUser,
    throwIf,
    ResponseWithUser,
} from '../../middlewares/auth.middleware';

const router = Router();

const emailValidator = () =>
    body('email')
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage('Invalid email address');

const passwordValidator = () =>
    body('password')
        .trim()
        .isLength({ min: 8 })
        .withMessage('Password has to be at least 8 characters long')
        .isLength({ max: 50 })
        .withMessage('Password has to be maximum 50 characters')
        .isAscii()
        .withMessage(
            'Password can only include latin letters, numbers and symbols'
        );

const createNoEmailOrPasswordError = (req, res) => ({
    code: 400,
    message: 'Email and password are required',
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

const throwIfInvalidEmail = throwIf<LoginRequest, Response>(
    createInvalidEmailError,
    (req, res) => !isEmailValid(req.body.email)
);

const throwIfInvalidPassword = throwIf<LoginRequest, Response>(
    createInvalidPasswordError,
    (req, res) => !isPasswordValid(req.body.password)
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
        // emailValidator(),
        // passwordValidator(),
        // runValidators,
        getUser,
        throwIfUserDoesNotExist,
        throwIfIncorrectPassword,
    ],
    loginUser
);

router.post(
    '/register',
    [
        emailValidator(),
        passwordValidator().custom(
            (value: string, { req }: { req: RegisterRequest }) => {
                if (value !== req.body.confirmPassword) {
                    return Promise.reject('Passwords must match');
                }
                return Promise.resolve;
            }
        ),
        runValidators,
        getUser,
        throwIfUserExists,
    ],
    registerUser
);

router.post(
    '/reset-password',
    [
        emailValidator()
            // maybe remove this check as it is bad security practise
            .custom((value: string, { req }: { req: ResetPasswordRequest }) => {
                if (false) {
                    return Promise.reject('No such user: ' + req.body.email);
                }
                return Promise.resolve();
            }),
        runValidators,
    ],
    resetUserPassword
);

export default router;
