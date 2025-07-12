import { Router } from 'express';
import { createUserHandler, updateUserHandler, getByIdUserHandler, getUserByEmailOrUserHandler } from '../controllers/users.controller';
import { tokenMiddleware, permitsMiddleware, idqueryMiddleware } from '&/interface/middlewares';

const router = Router();
router.post('/create', createUserHandler);
router.patch('/update', tokenMiddleware, idqueryMiddleware, permitsMiddleware, updateUserHandler);
router.get('/get_user_by_id', tokenMiddleware, idqueryMiddleware, permitsMiddleware, getByIdUserHandler);
router.get('/get_by_username', getUserByEmailOrUserHandler);

export default router;
