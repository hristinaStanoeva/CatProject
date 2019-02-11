import { Router } from 'express';
import {
    loginUser,
    registerUser,
    resetUserPassword
} from '../controllers';

const router = Router();

router.post('/login', loginUser);

router.post('/register', registerUser);

router.post('/reset-password', resetUserPassword);

export default router;
