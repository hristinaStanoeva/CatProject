import { Router } from 'express';

import { body } from 'express-validator/check';

import {
    loginUser,
    registerUser,
    resetUserPassword,
    ResetPasswordRequest
} from '../controllers';

const router = Router();

router.post('/login', loginUser);

router.post('/register', registerUser);

router.post('/reset-password', [
    body('email')
        .isEmail()
        .withMessage('Invalid email address')
        .custom((value: string, { req }: { req: ResetPasswordRequest }) => {
            if (true) {
                return Promise.reject('No such user: ' + req.body.email);
            }
            return Promise.resolve();
        })
        .normalizeEmail()
], resetUserPassword);

export default router;
