import { Router } from 'express';

import { body } from 'express-validator/check';

import {
    getAllListItems,
    createListItem,
    updateListItem,
    deleteListItemById
} from '../../controllers';
import { runValidators } from '../../middlewares/runValidators.middleware';

const router = Router();

router.get('/', getAllListItems);

router.post('/', [
    body('content')
        .exists({ checkFalsy: true })
        .withMessage('Content has to be provided')
        .isString()
        .withMessage('Content has to be string'),
    runValidators
], createListItem);

router.put('/:id', updateListItem);

router.delete('/:id', deleteListItemById);

export default router;
