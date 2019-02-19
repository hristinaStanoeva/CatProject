import { Router } from 'express';

import { body } from 'express-validator/check';

import {
    loginUser,
    registerUser,
    resetUserPassword,
    ResetPasswordRequest,
    RegisterRequest,
    LoginRequest
} from '../../controllers';
import { runValidators } from '../../middlewares/runValidators.middleware';

const router = Router();

router.post('/login', [
    body('email')
        .normalizeEmail()
        .isEmail()
        .withMessage('Invalid email address')
        // move to a separate middleware to check db data
        .custom((value: string, { req }: { req: LoginRequest }) => {
            if (false) {
                return Promise.reject(`${req.body.email} is not yet registered`);
            }
            return Promise.resolve();
        }),
    body('password')
        .trim()
        .isLength({ min: 8 })
        .withMessage('Password has to be at least 8 characters long')
        .custom((value: string, { req }: { req: LoginRequest }) => {
            if (false) {
                return Promise.reject('Wrong password');
            }
            return Promise.resolve();
        }),
    runValidators
    // next middleware should get the user from db and attach it to the req object
    // the logic is that the controller gets all the data needed for doing its job(logging in the user)
], loginUser);

router.post('/register', [
    body('email')
        .isEmail()
        .withMessage('Invalid email address')
        // maybe move to a separete middleware for checking if the email is in the db
        .custom((value: string, { req }: { req: RegisterRequest }) => {
            if (false) {
                return Promise.reject(`Email ${req.body.email} already exists`);
            }
            return Promise.resolve();
        })
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min: 8 })
        .withMessage('Password has to be at least 8 characters long')
        .custom((value: string, { req }: { req: RegisterRequest }) => {
            if (value !== req.body.confirmPassword) {
                return Promise.reject('Passwords must match');
            }
            return Promise.resolve;
        }),
    runValidators
], registerUser);

router.post('/reset-password', [
    body('email')
        .isEmail()
        .withMessage('Invalid email address')
        // maybe remove this check as it is bad security practise
        .custom((value: string, { req }: { req: ResetPasswordRequest }) => {
            if (false) {
                return Promise.reject('No such user: ' + req.body.email);
            }
            return Promise.resolve();
        })
        .normalizeEmail(),
    runValidators
], resetUserPassword);

export default router;
