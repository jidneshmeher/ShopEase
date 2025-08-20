import Review from '../models/reviewModel.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import CustomError from '../utils/CustomError.js';

export const addReview = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { product, rating, comment } = req.body;

  if (!product || !rating) {
    return next(new CustomError('Product and rating are required', 400));
  }

  const existingReview = await Review.findOne({ user: userId, product });
  if (existingReview) {
    return next(new CustomError('You have already reviewed this product', 400));
  }

  const review = await Review.create({
    user: userId,
    product,
    rating,
    comment,
  });

  res.status(201).json({
    success: true,
    data: review,
    message: 'Review added successfully',
  });
});

export const updateReview = asyncHandler(async (req, res, next) => {
  const reviewId = req.params.id;
  const userId = req.user._id;
  const { rating, comment } = req.body;

  const review = await Review.findById(reviewId);
  if (!review) {
    return next(new CustomError('Review not found', 404));
  }

  if (review.user.toString() !== userId.toString()) {
    return next(new CustomError('Not authorized to update this review', 403));
  }

  if (rating) review.rating = rating;
  if (comment !== undefined) review.comment = comment;

  await review.save();

  res.status(200).json({
    success: true,
    data: review,
    message: 'Review updated successfully',
  });
});

export const deleteReview = asyncHandler(async (req, res, next) => {
  const reviewId = req.params.id;
  const userId = req.user._id;

  const review = await Review.findById(reviewId);
  if (!review) {
    return next(new CustomError('Review not found', 404));
  }

  if (review.user.toString() !== userId.toString()) {
    return next(new CustomError('Not authorized to delete this review', 403));
  }

  await review.remove();

  res.status(200).json({
    success: true,
    message: 'Review deleted successfully',
  });
});

export const getReviewsByProduct = asyncHandler(async (req, res, next) => {
  const productId = req.params.productId;

  const reviews = await Review.find({ product: productId })
    .populate('user', 'name email')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: reviews.length,
    data: reviews,
  });
});
