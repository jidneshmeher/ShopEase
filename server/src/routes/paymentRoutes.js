import {Router} from 'express';
import { createOrder, verifyPayment } from '../controllers/paymentController.js';  
import protect from '../middlewares/authMiddleware.js';

const router = Router();

router.use(protect);

router.route('/create-order')
    .post(createOrder);

router.route('/verify-payment')
    .post(verifyPayment);

export default router;