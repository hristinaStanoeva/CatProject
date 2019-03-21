import { Response, NextFunction } from 'express';
import { sign } from 'jsonwebtoken';

import { db } from '../util/database';
import { CustomBodyRequest } from '../models';
import { ResponseWithUser } from '../middlewares/auth.middleware';

export type LoginRequest = CustomBodyRequest<'email' | 'password'>;
export type RegisterRequest = CustomBodyRequest<
    'email' | 'password' | 'confirmPassword'
>;
export type ResetPasswordRequest = CustomBodyRequest<'email'>;

export const loginUser = (
    req: LoginRequest,
    res: ResponseWithUser,
    next: NextFunction
) => {
    const token = sign(
        {
            email: res.locals.user.email,
            id: res.locals.user.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
    );
    return res.status(200).json({ userId: res.locals.user.id, token });
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
