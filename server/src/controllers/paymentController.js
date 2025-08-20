import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/orderModel.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import CustomError from '../utils/CustomError.js';
import Product from '../models/productModel.js';
import {sendEmail} from '../utils/sendEmail.js'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const calculateOrderAmount = (orderItems) => {
  return orderItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0) * 100;
};

export const createOrder = asyncHandler(async (req, res) => {
  const { orderItems} = req.body;

  if (!orderItems || orderItems.length === 0) {
    throw new CustomError('Order items are required', 400);
  }

  const amount = calculateOrderAmount(orderItems);

  const razorpayOrder = await razorpay.orders.create({
    amount,
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
    payment_capture: 1,
  });

  res.status(201).json({
    success: true,
    data: {
      razorpayOrderId: razorpayOrder.id,
      razorpayKeyId: process.env.RAZORPAY_KEY_ID,
      amount,
      currency: 'INR',
    },
  });
});

export const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderItems, shippingAddress, userId, email } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    throw new CustomError('Missing payment details', 400);
  }

  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    throw new CustomError('Invalid signature', 400);
  }

  const totalPrice = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const order = await Order.create({
    user: userId,
    orderItems,
    totalPrice,
    status: 'processing',
    paymentStatus: 'paid',
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    shippingAddress,
  });

  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    if (product) {
      product.stock = Math.max(product.stock - item.quantity, 0);
      await product.save();
    }
  }

  const emailHtml = `
    <h1>Thank you for your order!</h1>
    <p>Hi,</p>
    <p>Your order has been placed successfully.</p>
    <p><strong>Order ID:</strong> ${order._id}</p>
    <p><strong>Total:</strong> ₹${totalPrice.toLocaleString()}</p>
    <h3>Shipping Address:</h3>
    <p>
      ${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.state}, 
      ${shippingAddress.zipCode}, ${shippingAddress.country}
    </p>
    <h3>Order Items:</h3>
    <ul>
      ${orderItems.map(i => `<li>${i.quantity} x ${i.productName} @ ₹${i.price.toLocaleString()}</li>`).join('')}
    </ul>
    <p>We will notify you once your order is shipped.</p>
  `;

  await sendEmail({
    to: email,
    subject: 'ShopEase Order Confirmation',
    html: emailHtml,
  });

  res.status(200).json({ success: true, message: 'Payment verified and order created', data: order });
});
