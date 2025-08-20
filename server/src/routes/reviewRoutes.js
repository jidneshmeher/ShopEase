import {Router} from 'express';
import {
  addReview,
  updateReview,
  deleteReview,
  getReviewsByProduct,
} from '../controllers/reviewController.js';
import protect from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/product/:productId', getReviewsByProduct);
router.post('/', protect, addReview);
router.route('/:id')
  .put(protect, updateReview)
  .delete(protect, deleteReview);

export default router;
