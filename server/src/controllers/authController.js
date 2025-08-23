import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import CustomError from '../utils/CustomError.js';
import crypto from 'crypto'
import { forgotPasswordTemplate } from '../utils/emailTemplate.js';
import { sendEmail } from '../utils/sendEmail.js';

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
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
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
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    })
    .json({
      success: true,
      message: 'Logged out successfully',
    });
};

export const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new CustomError('User not found with this email', 404));
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.CLIENT_URL}reset-password/${resetToken}`;

  try {
    await sendEmail({
      to: user.email,
      subject: 'ShopEase Password Reset',
      html: forgotPasswordTemplate(resetUrl, user.name),
    });

    res.status(200).json({
      success: true,
      message: 'Password reset link sent to your email',
    });
  } catch (err) {
      // console.error(err)
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return next(new CustomError('Email could not be sent', 500));
  }

});

export const resetPassword = asyncHandler(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new CustomError('Invalid or expired reset token', 400));
  }

  const { password } = req.body;
  if (!password) {
    return next(new CustomError('Password is required', 400));
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendTokenResponse(user, 200, res);
});
