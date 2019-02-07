import { Request, Response, NextFunction } from 'express';

export const getAllListItems = (req: Request, res: Response, next: NextFunction) => {
    res.json('Got all list items!');
};

export const createListItem = (req: Request, res: Response, next: NextFunction) => {
    res.json('Created list item');
}

export const updateListItem = (req: Request, res: Response, next: NextFunction) => {
    res.json('Updated list item with id ' + req.params.id);
};

export const deleteListItemById = (req: Request, res: Response, next: NextFunction) => {
    res.json('Deleted list item by id ' + req.params.id);
}
