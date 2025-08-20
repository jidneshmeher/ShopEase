import User from '../models/userModel.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import CustomError from '../utils/CustomError.js';

export const updateProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new CustomError('User not found', 404));
  }

  if (req.body.email && req.body.email !== user.email) {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return next(new CustomError('Email already exists', 400));
    }
    user.email = req.body.email;
  }

  user.name = req.body.name || user.name;

  if (req.body.phone) {
    const phoneRegex = /^\+[1-9]\d{6,14}$/;
    if (!phoneRegex.test(req.body.phone)) {
      return next(new CustomError('Invalid phone number format', 400));
    }
    user.phone = req.body.phone;
  }

  const newAddress = {
    street: req.body.address?.street || user.address?.[0]?.street || '',
    city: req.body.address?.city || user.address?.[0]?.city || '',
    state: req.body.address?.state || user.address?.[0]?.state || '',
    zipCode: req.body.address?.zipCode || user.address?.[0]?.zipCode || '',
    country: req.body.address?.country || user.address?.[0]?.country || '',
};

if (Object.values(newAddress).some(Boolean)) {
  user.address = [newAddress];
} else {
  user.address = [];
}

  const updatedUser = await user.save();

  updatedUser.password = undefined;

  res.status(200).json({
    success: true,
    data: updatedUser,
  });
});
