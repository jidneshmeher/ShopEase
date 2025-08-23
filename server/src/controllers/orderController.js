import Order from '../models/orderModel.js';
import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import CustomError from '../utils/CustomError.js';
import { sendEmail } from '../utils/sendEmail.js';
import { orderConfirmationTemplate } from "../utils/emailTemplate.js";

export const placeOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { shippingAddress, email } = req.body;

  const cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart || cart.items.length === 0) {
    throw new CustomError("Cart is empty", 400);
  }

  const orderItems = cart.items.map(item => ({
    product: item.product._id,
    productName: item.product.name,
    quantity: item.quantity,
    price: item.product.price,
  }));

  const totalPrice = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order = await Order.create({
    user: userId,
    orderItems,
    shippingAddress,
    totalPrice,
    status: "processing",
    paymentStatus: "pending",
  });

  await Promise.all(
    orderItems.map(async (item) => {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock = Math.max(product.stock - item.quantity, 0);
        await product.save();
      }
    })
  );

  await Cart.findOneAndDelete({ user: userId });

  if (email) {
    const emailHtml = orderConfirmationTemplate(order, shippingAddress, orderItems, totalPrice);

    await sendEmail({
      to: email,
      subject: "ShopEase Order Confirmation",
      html: emailHtml,
    });
  }

  res.status(201).json({
    success: true,
    message: "Order placed successfully",
    data: order,
  });
});

export const getMyOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id }).populate('orderItems.product').sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    data: orders,
  });
});

export const getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findOne({ _id: req.params.id, user: req.user._id }).populate('orderItems.product');

  if (!order) {
    return next(new CustomError('Order not found', 404));
  }

  res.status(200).json({
    success: true,
    data: order,
  });
});

export const updateOrderStatus = asyncHandler(async (req, res, next) => {
  const orderId = req.params.id;
  const { status } = req.body;

  const allowedStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  if (!allowedStatuses.includes(status)) {
    return next(new CustomError('Invalid status', 400));
  }

  const order = await Order.findById(orderId);
  if (!order) {
    return next(new CustomError('Order not found', 404));
  }

  order.status = status;
  await order.save();

  res.json({ success: true, order });
});
