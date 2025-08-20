import {Router} from 'express';
import { registerUser, loginUser, getCurrentUser, logoutUser } from '../controllers/authController.js';
import protect from '../middlewares/authMiddleware.js';

const router = Router();

router.route('/register')
    .post(registerUser);

router.route('/login')
    .post(loginUser);

router.route('/me')
    .get(protect , getCurrentUser)

router.route('/logout')
    .post(protect , logoutUser)

export default router;