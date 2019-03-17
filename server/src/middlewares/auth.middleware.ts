import { Request } from 'express';

import { db } from '../util/database';
import { CustomLocalsResponse } from '../models/custom-locals-response.model';
import { Middleware } from '../models/middleware.model';
import { UserInstance } from '../schemas';
import { OperationalError } from '../util/errors';

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
