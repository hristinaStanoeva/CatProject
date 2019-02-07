import { Router } from 'express';
import {
    getAllLists,
    getListById,
    createList,
    deleteListById
} from '../controllers';

const router = Router();

router.get('/', getAllLists);

router.get('/:id', getListById);

router.post('/', createList);

router.delete('/:id', deleteListById);

export default router;
