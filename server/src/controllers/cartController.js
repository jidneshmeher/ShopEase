import Cart from "../models/cartModel.js"
import Product from "../models/productModel.js"
import { asyncHandler } from '../utils/asyncHandler.js';
import CustomError from '../utils/CustomError.js';

export const getCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

  if (!cart) {
    return res.status(200).json({
      success: true,
      message: 'Cart is empty',
      items: [],
    });
  }

  res.status(200).json({
    success: true,
    message: 'Cart fetched successfully',
    cart,
  });
});

export const addToCart = asyncHandler(async (req, res, next) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return next(new CustomError('Product ID and quantity required', 400));
  }

  const product = await Product.findById(productId);
  if (!product) {
    return next(new CustomError('Product not found', 404));
  }

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: [{ product: productId, quantity }],
    });
  } else {
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
  }

  res.status(200).json({
    success: true,
    data: cart,
    message: 'Product added to cart successfully',
  });
});

export const updateCartItem = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return next(new CustomError('Quantity must be at least 1', 400));
  }

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return next(new CustomError('Cart not found', 404));
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex === -1) {
    return next(new CustomError('Product not found in cart', 404));
  }

  cart.items[itemIndex].quantity = quantity;
  await cart.save();

  const updatedCart = await Cart.findById(cart._id).populate('items.product');


  res.status(200).json({
    success: true,
    data: updatedCart,
    message: 'Cart item updated successfully',
  });
});

export const removeFromCart = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return next(new CustomError('Cart not found', 404));
  }

  const originalLength = cart.items.length;
  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  if (cart.items.length === originalLength) {
    return next(new CustomError('Product not found in cart', 404));
  }

  await cart.save();

  res.status(200).json({
    success: true,
    data: cart,
    message: 'Product removed from cart successfully',
  });
});

export const clearCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(200).json({
      success: true,
      message: 'Cart is already empty',
    });
  }

  cart.items = [];
  await cart.save();

  res.status(200).json({
    success: true,
    message: 'Cart cleared successfully',
  });
});