import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/check';

interface CustomBodyRequest<K extends keyof any> extends Request {
    body: Partial<Record<K, string>>;
}

export type LoginRequest = CustomBodyRequest<'email' | 'password'>;
export type RegisterRequest = CustomBodyRequest<'email' | 'password' | 'confirmPassword'>;
export type ResetPasswordRequest = CustomBodyRequest<'email'>;

interface ValidationResult {
    location: Location;
    param: string;
    msg: any;
    value: any;
}

export const loginUser = (req: LoginRequest, res: Response, next: NextFunction) => {
    res.json('User logged in!');
};

export const registerUser = (req: RegisterRequest, res: Response, next: NextFunction) => {
    res.json('User registered!');
};

export const resetUserPassword = (req: ResetPasswordRequest, res: Response, next: NextFunction) => {
    if (validationResult(req).isEmpty()) {
        return res.sendStatus(200);
    } else {
        const result = validationResult<ValidationResult>(req)
            .array()
            .map(({ msg, param }) => ({ field: param, error: msg }));
        return res.status(400).json(result);
    }
};
