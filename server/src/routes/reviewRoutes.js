import {Router} from 'express';
import {
  addReview,
  updateReview,
  deleteReview,
  getReviewsByProduct,
} from '../controllers/reviewController.js';
import protect from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/', protect, addReview);
router.route('/:id')
  .put(protect, updateReview)
  .delete(protect, deleteReview);
router.get('/product/:productId', getReviewsByProduct);

export default router;
