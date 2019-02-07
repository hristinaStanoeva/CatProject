import { Request, Response, NextFunction } from 'express';

export const getAllLists = (req: Request, res: Response, next: NextFunction) => {
    res.json('Got all lists!');
};

export const createList = (req: Request, res: Response, next: NextFunction) => {
    res.json('Created new list!');
};

export const deleteListById = (req: Request, res: Response, next: NextFunction) => {
    res.json('Deleted list by id ' + req.params.id);
};

export const getListById = (req: Request, res: Response, next: NextFunction) => {
    res.json('Got list by id ' + req.params.id);
};
