import { Router } from 'express';

import { body } from 'express-validator/check';

import {
    getAllLists,
    getListById,
    createList,
    updateList,
    deleteListById,
} from '../../controllers';
import { runValidators } from '../../middlewares/runValidators.middleware';

const router = Router();

const titleValidator = () =>
    body('title')
        .exists({ checkFalsy: true })
        .withMessage('Title has to be provided')
        .isString()
        .withMessage('Title has to be string');

router.get('/', getAllLists);

// should return list with name and array of items
router.get('/:id', getListById);

router.post('/', [titleValidator(), runValidators], createList);

router.put('/:id', [titleValidator(), runValidators], updateList);

router.delete('/:id', deleteListById);

export default router;
