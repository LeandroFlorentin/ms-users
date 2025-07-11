import { Router } from 'express';
import { createUserHandler, updateUserHandler, getByIdUserHandler, getUserByEmailOrUserHandler } from '../controllers/users.controller';
import { tokenMiddleware, permitsMiddleware } from '&/interface/middlewares';

const router = Router();
router.post('/create', createUserHandler);
router.patch('/update', tokenMiddleware, permitsMiddleware, updateUserHandler);
router.get('/get_user_by_id', tokenMiddleware, permitsMiddleware, getByIdUserHandler);
router.get('/get_by_username', getUserByEmailOrUserHandler);

export default router;
