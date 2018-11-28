import { Router } from 'express';

import { CustomRequest } from '../models';

const router = Router();

router.post('/add-user', (req, res, next) => {
    console.log('body: ', req.body);
    res.json(req.body);
});

router.get('/user', (req: CustomRequest, res) => {
    return res.send('User!');
});

router.get('/', (req: CustomRequest, res) => {
    return res.json(req.customData);
});

export default router;
