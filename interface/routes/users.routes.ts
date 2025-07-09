import { Router } from 'express';
import { createUserHandler, updateUserHandler, getUserByEmailOrUserHandler } from '../controllers/users.controller';
import { tokenMiddleware } from '../middlewares/token.middleware';

const router = Router();
router.post('/create', createUserHandler);
router.patch('/update', tokenMiddleware, updateUserHandler);
router.get('/get_by_username', getUserByEmailOrUserHandler);

export default router;
