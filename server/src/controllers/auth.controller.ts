import { Response, NextFunction } from 'express';
import { sign } from 'jsonwebtoken';

// import { db } from '../util/database';
import { CustomBodyRequest } from '../models';
import { getUserRepository } from '../entities';
// import { ResponseWithUser } from '../middlewares/auth.middleware';

export type LoginRequest = CustomBodyRequest<'email' | 'password'>;
export type RegisterRequest = CustomBodyRequest<
    'email' | 'password' | 'confirmPassword'
>;
export type ResetPasswordRequest = CustomBodyRequest<'email'>;

// const loginUser = (authService: AuthService) => (req, res...) =>
export const loginUser = (
    req: LoginRequest,
    res: Response /* ResponseWithUser */,
    next: NextFunction
) => {
    // auth-service.login({user}).then(...)
    const token = sign(
        {
            email: res.locals.user.email,
            id: res.locals.user.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
    );
    // try {
    //     console.log(jwt.verify(token, process.env.JWT_SECRET + 'aaa'));
    // } catch (e) {
    //     if (e instanceof jwt.JsonWebTokenError) {
    //         console.log('jwt error!');
    //         console.log(e.name);
    //         console.log(e.message);
    //     } else {
    //         console.log(e);
    //     }
    // }
    return res.status(200).json({ userId: res.locals.user.id, token });
};

export const registerUser = async (
    req: RegisterRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = await getUserRepository().save({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(200).json({ userId: id, token: 'token' });
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
