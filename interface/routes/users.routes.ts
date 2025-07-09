import { Router } from 'express';
import { createUserHandler, updateUserHandler, getUserByEmailOrUserHandler } from '../controllers/users.controller';
import { tokenMiddleware, permitsMiddleware } from '&/interface/middlewares';

const router = Router();
router.post('/create', createUserHandler);
router.patch('/update', tokenMiddleware, permitsMiddleware, updateUserHandler);
router.get('/get_by_username', getUserByEmailOrUserHandler);

export default router;
