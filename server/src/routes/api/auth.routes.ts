import { Router } from 'express';

import {
    loginUser,
    registerUser,
    resetUserPassword,
    // ResetPasswordRequest,
} from '../../controllers';
import {
    getUser,
    throwIfNoEmailOrPassword,
    throwIfInvalidEmail,
    throwIfInvalidPassword,
    throwIfUserDoesNotExist,
    throwIfIncorrectPassword,
    throwIfNoEmailPasswordOrConfirmPassword,
    throwIfNoMatchingPasswords,
    throwIfUserExists,
} from '../../middlewares/auth.middleware';

const router = Router();

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
