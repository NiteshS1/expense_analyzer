import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const controller = new AuthController();

router.post('/signup', controller.signupUser);

router.post('/login', controller.loginUser);

router.get('/me', controller.userMe);

export default router;
