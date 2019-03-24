import { Request, NextFunction } from 'express';

import { db } from '../util/database';
import { CustomLocalsResponse, Middleware } from '../models';
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

export const throwIf = <TReq, TRes>(
    errCallback: (req: TReq, res: TRes) => { code: number; message: string }
) => (
    predicate: (req: TReq, res: TRes) => boolean | Promise<boolean>
): Middleware<TReq, TRes> => async (
    req: TReq,
    res: TRes,
    next: NextFunction
) => {
    const { code, message } = errCallback(req, res);
    (await predicate(req, res))
        ? next(new OperationalError(code, message))
        : next();
};
