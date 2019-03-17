import { Router } from 'express';

import { body } from 'express-validator/check';

import {
    loginUser,
    registerUser,
    resetUserPassword,
    ResetPasswordRequest,
    RegisterRequest,
} from '../../controllers';
import { runValidators } from '../../middlewares/run-validators.middleware';
import {
    getUser,
    throwIfUserExists,
    throwIfUserDoesNotExist,
} from '../../middlewares/auth.middleware';

const router = Router();

const emailValidator = () =>
    body('email')
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

router.post(
    '/login',
    [
        emailValidator(),
        passwordValidator(),
        runValidators,
        getUser,
        throwIfUserDoesNotExist,
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
