import { Router } from 'express';

import { body } from 'express-validator/check';
import { compare } from 'bcrypt';

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
import { Middleware } from '../../models';

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

const createNotRegisteredError: Middleware<
    LoginRequest,
    ResponseWithUser,
    { code: number; message: string }
> = (req, res) => ({
    code: 400,
    message: `${req.body.email} is not yet registered!`,
});
const checkUserExistance: Middleware<
    LoginRequest,
    ResponseWithUser,
    boolean
> = (req, res) => !res.locals.user;

const throwIfUserDoesNotExist = throwIf<
    LoginRequest,
    ResponseWithUser
>(createNotRegisteredError, checkUserExistance);

const createAlreadyRegisteredError: Middleware<
    RegisterRequest,
    ResponseWithUser,
    { code: number; message: string }
> = (req, res) => {
    return { code: 400, message: `${req.body.email} already exists!` };
};

const throwIfUserExists = throwIf<
    RegisterRequest,
    ResponseWithUser
>(createAlreadyRegisteredError, (req, res) => !!res.locals.user);

const throwIfInvalidPassowrd = throwIf<
    LoginRequest,
    ResponseWithUser
>(
    (req, res) => ({ code: 400, message: 'Invalid password' }),
    async (req, res) =>
        !(await compare(req.body.password, res.locals.user.password))
);

router.post(
    '/login',
    [
        emailValidator(),
        passwordValidator(),
        runValidators,
        getUser,
        throwIfUserDoesNotExist,
        throwIfInvalidPassowrd,
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
