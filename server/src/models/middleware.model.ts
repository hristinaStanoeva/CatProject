import { NextFunction } from 'express';

export type Middleware<TReq, TRes> = (
    req: TReq,
    res: TRes,
    next: NextFunction
) => void | Promise<void>;
