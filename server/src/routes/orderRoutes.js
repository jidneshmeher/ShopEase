import {Router} from "express"
import {
placeOrder,
getMyOrders,
getOrderById,
updateOrderStatus  
} from '../controllers/orderController.js';
import protect from '../middlewares/authMiddleware.js';
import admin from "../middlewares/adminMiddleware.js";

const router = Router();

router.use(protect);

router.route('/')
    .get(getMyOrders)
    .post(placeOrder);

router.route('/:id')
    .get(getOrderById)
    .patch(admin, updateOrderStatus);

export default router;