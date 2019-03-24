import { NextFunction } from 'express';

export type Middleware<TReq, TRes, TReturn = void> = (
    req: TReq,
    res: TRes,
    next?: NextFunction
) => TReturn | Promise<TReturn>;
