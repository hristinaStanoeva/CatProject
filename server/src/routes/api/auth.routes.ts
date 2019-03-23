import { Router } from 'express';

import { body } from 'express-validator/check';

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
    // throwIfUserExists,
    // throwIfUserDoesNotExist,
    checkPassword,
    throwIf,
    ResponseWithUser,
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

const throwIfUserDoesNotExist = throwIf<LoginRequest, ResponseWithUser>(
    400,
    'Not yet registered'
)((req, res) => !res.locals.user);
const throwIfUserExists = throwIf<RegisterRequest, ResponseWithUser>(
    400,
    'User exists'
)((req, res) => !!res.locals.user);
router.post(
    '/login',
    [
        emailValidator(),
        passwordValidator(),
        runValidators,
        getUser,
        // throwIf<LoginRequest, ResponseWithUser>(),
        throwIfUserDoesNotExist,
        checkPassword,
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
        // throwIf<RegisterRequest, ResponseWithUser>(
        //     (req, res) => !!res.locals.user
        // ),
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
