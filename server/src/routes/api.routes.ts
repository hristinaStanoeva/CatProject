import { Router } from 'express';

import { authRoutes, listItemsRoutes, listsRoutes } from './api';

const router = Router();

router.use('/lists', listsRoutes);
router.use('/list-items', listItemsRoutes);
router.use('/auth', authRoutes);

export default router;
