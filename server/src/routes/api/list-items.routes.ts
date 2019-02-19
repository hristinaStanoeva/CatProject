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

const contentValidator = () => body('content')
    .exists({ checkFalsy: true })
    .withMessage('Content has to be provided')
    .isString()
    .withMessage('Content has to be string');

const checkedValidator = () => body('checked')
    .isBoolean();

router.get('/', getAllListItems);

router.post('/', [
    contentValidator(),
    checkedValidator(),
    runValidators
], createListItem);

router.put('/:id', [
    contentValidator(),
    checkedValidator(),
    runValidators
    // get the item from db
], updateListItem);

router.delete('/:id', deleteListItemById);

export default router;
