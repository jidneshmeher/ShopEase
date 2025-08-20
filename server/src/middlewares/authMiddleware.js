import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import CustomError from '../utils/CustomError.js';

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return next(new CustomError('Not authorized, token missing', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return next(new CustomError('User not found', 401));
    }

    req.user = user;
    next();
  } catch (err) {
    return next(new CustomError('Invalid or expired token', 401));
  }
});

export default protect;
