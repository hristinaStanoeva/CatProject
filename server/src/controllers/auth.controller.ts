import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/check';
import { Location } from 'express-validator/check/location';

import { CustomBodyRequest } from '../models/custom-body-request.model';

export type LoginRequest = CustomBodyRequest<'email' | 'password'>;
export type RegisterRequest = CustomBodyRequest<'email' | 'password' | 'confirmPassword'>;
export type ResetPasswordRequest = CustomBodyRequest<'email'>;

export const loginUser = (req: LoginRequest, res: Response, next: NextFunction) => {
        return res.status(200).json({ userId: 'user id', token: 'token' });
};

export const registerUser = (req: RegisterRequest, res: Response, next: NextFunction) => {
        return res.status(200).json({ userId: 'user id', token: 'token' });
};

export const resetUserPassword = (req: ResetPasswordRequest, res: Response, next: NextFunction) => {
        return res.sendStatus(200);
};
