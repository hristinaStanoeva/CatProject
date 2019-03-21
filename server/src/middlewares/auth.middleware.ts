import { Request } from 'express';

import { db } from '../util/database';
import { CustomLocalsResponse, Middleware } from '../models';
import { UserInstance } from '../schemas';
import { OperationalError } from '../util/errors';
import { LoginRequest } from '../controllers';

export type ResponseWithUser = CustomLocalsResponse<{ user: UserInstance }>;

export const getUser: Middleware<Request, ResponseWithUser> = async (
    req,
    res,
    next
) => {
    try {
        res.locals.user = await db.User.findOne({
            where: { email: req.body.email },
        });
        return next();
    } catch (e) {
        return next(e);
    }
};

export const throwIfUserExists: Middleware<Request, ResponseWithUser> = (
    req,
    res,
    next
) => {
    if (res.locals.user) {
        return next(new OperationalError(400, 'User exists'));
    }
    return next();
};

export const throwIfUserDoesNotExist: Middleware<
    LoginRequest,
    ResponseWithUser
> = (req, res, next) => {
    if (!res.locals.user) {
        return next(
            new OperationalError(400, `${req.body.email} is not yet registered`)
        );
    }
    return next();
};

export const checkPassword: Middleware<LoginRequest, ResponseWithUser> = async (
    req,
    res,
    next
) => {
    if (!(await res.locals.user.isPasswordValid(req.body.password))) {
        return next(new OperationalError(400, 'Invalid password'));
    }
    return next();
};
