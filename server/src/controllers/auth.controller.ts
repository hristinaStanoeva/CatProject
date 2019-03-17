import { Response, NextFunction } from 'express';

import { db } from '../util/database';
import { CustomBodyRequest } from '../models';

export type LoginRequest = CustomBodyRequest<'email' | 'password'>;
export type RegisterRequest = CustomBodyRequest<
    'email' | 'password' | 'confirmPassword'
>;
export type ResetPasswordRequest = CustomBodyRequest<'email'>;

export const loginUser = (
    req: LoginRequest,
    res: Response,
    next: NextFunction
) => {
    return res.status(200).json({ userId: 'user id', token: 'token' });
};

export const registerUser = async (
    req: RegisterRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        // @ts-ignore
        const user = await db.User.create({
            email: req.body.email,
            password: req.body.password,
        });

        return res.status(200).json({ userId: 'user id', token: 'token' });
    } catch (e) {
        next(e);
    }
};

export const resetUserPassword = (
    req: ResetPasswordRequest,
    res: Response,
    next: NextFunction
) => {
    return res.sendStatus(200);
};
