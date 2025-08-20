import {Router} from "express"
import {
getCart,
addToCart,
updateCartItem,
removeFromCart,
clearCart
} from '../controllers/cartController.js';
import protect from '../middlewares/authMiddleware.js';

const router = Router();

router.use(protect);

router.route('/')
  .get(getCart)        
  .post(addToCart);    

router.route('/item/:productId')
  .patch(updateCartItem)    
  .delete(removeFromCart);  

router.route('/clear')
  .delete(clearCart);     

export default router;
