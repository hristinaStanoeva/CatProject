import { Request, Response, NextFunction } from 'express';

export const loginUser = (req: Request, res: Response, next: NextFunction) => {
    res.json('User logged in!');
};

export const registerUser = (req: Request, res: Response, next: NextFunction) => {
    res.json('User registered!');
};

export const resetUserPassword = (req: Request, res: Response, next: NextFunction) => {
    res.json('Password reset!');
};
