import { Router } from 'express';
import {
    getAllListItems,
    createListItem,
    updateListItem,
    deleteListItemById
} from '../../controllers';

const router = Router();

router.get('/', getAllListItems);

router.post('/', createListItem);

router.put('/:id', updateListItem);

router.delete('/:id', deleteListItemById);

export default router;
