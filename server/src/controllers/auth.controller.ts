import { Request, Response, NextFunction } from 'express';

interface CustomBodyRequest<K extends keyof any> extends Request {
    body: Partial<Record<K, string>>;
}

export type LoginRequest = CustomBodyRequest<'email' | 'password'>;
export type RegisterRequest = CustomBodyRequest<'email' | 'password' | 'confirmPassword'>;
export type ResetPasswordRequest = CustomBodyRequest<'email'>;

export const loginUser = (req: LoginRequest, res: Response, next: NextFunction) => {
    res.json('User logged in!');
};

export const registerUser = (req: RegisterRequest, res: Response, next: NextFunction) => {
    res.json('User registered!');
};

export const resetUserPassword = (req: ResetPasswordRequest, res: Response, next: NextFunction) => {
    res.json('Password reset!');
};
