import {Router} from 'express';
import { registerUser, loginUser, getCurrentUser, logoutUser, forgotPassword, resetPassword } from '../controllers/authController.js';
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

router.route('/forgot-password')
    .post(forgotPassword)

router.route('/reset-password/:token')
    .put(resetPassword)

export default router;