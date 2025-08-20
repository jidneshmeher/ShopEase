import CustomError from '../utils/CustomError.js';

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return next(new CustomError('Not authorized as admin', 403));
  }
};

export default admin;
