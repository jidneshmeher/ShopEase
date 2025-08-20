import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import CustomError from '../utils/CustomError.js';

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, 
  };

  res
    .status(statusCode)
    .cookie('token', token, cookieOptions)
    .json({
      success: true,
      data: user,
    });
};

export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, phone} = req.body;

  if (!name || !email || !password || !phone) {
    return next(new CustomError("All fields are required", 400));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new CustomError('User already exists with this email', 400));
  }

  const existingPhone = await User.findOne({ phone });
  if (existingPhone) {
    return next(new CustomError('User already exists with this phone number', 400));
  }

  const user = await User.create({ name, email, password, phone});
  user.password = undefined;

  sendTokenResponse(user, 201, res);
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new CustomError("All fields are required", 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    return next(new CustomError('Invalid email or password', 401));
  }

  user.password = undefined;

  sendTokenResponse(user, 200, res);
});

export const getCurrentUser = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    return next(new CustomError("Not authenticated", 401));
  }

  res.status(200).json({
    success: true,
    data: req.user
  });
});

export const logoutUser = (req, res) => {
  res
    .cookie('token', '', {
      httpOnly: true,
      expires: new Date(0),
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    })
    .json({
      success: true,
      message: 'Logged out successfully',
    });
};