import { Router } from 'express';
import { UserController } from './controller/user-controller';
import { AuthController } from './controller/auth-controller';
import { authMiddleware } from './middleware/auth';

const usersController = new UserController();
const authController = new AuthController();

export const router = Router();

// pretected routes
router.get('/users/me', authMiddleware, usersController.me);

// public routes
router.post('/users', usersController.create);
router.post('/auth', authController.authenticate);
