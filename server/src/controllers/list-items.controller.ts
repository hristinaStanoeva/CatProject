import { Request, Response, NextFunction } from 'express';

import { CustomBodyRequest } from '../models/custom-body-request.model';

type ListItemRequest = CustomBodyRequest<'content' | 'checked'>;

export const getAllListItems = (req: Request, res: Response, next: NextFunction) => {
    // always returns an array
    res.status(200).json('Got all list items!');
};

export const createListItem = (req: ListItemRequest, res: Response, next: NextFunction) => {
    // return list item id, content and state
    res.json('Created list item');
};

export const updateListItem = (req: ListItemRequest, res: Response, next: NextFunction) => {
    // return list item id, content and state
    res.json('Updated list item with id ' + req.params.id);
};

export const deleteListItemById = (req: Request, res: Response, next: NextFunction) => {
    // maybe return item id, content and state?
    res.json('Deleted list item by id ' + req.params.id);
};
