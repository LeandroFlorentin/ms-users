import { Router } from 'express';
import { createUserHandler, getUserByEmailOrUserHandler } from '../controllers/users.controller';

const router = Router();
router.post('/create', createUserHandler);
router.get('/get_by_username', getUserByEmailOrUserHandler);

export default router;
