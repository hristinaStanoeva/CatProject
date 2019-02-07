import { Router } from 'express';
import {
    getAllLists,
    getListById,
    createList,
    deleteListById
} from '../controllers';

const router = Router();

router.get('/lists', getAllLists);

router.get('/lists/:id', getListById);

router.post('/lists', createList);

router.delete('/lists/:id', deleteListById);

export default router;
