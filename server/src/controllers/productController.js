import Product from '../models/productModel.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import CustomError from '../utils/CustomError.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import ApiFeatures from '../utils/apiFeature.js';

export const getAllProducts = asyncHandler(async (req, res) => {
  const features = new ApiFeatures(Product.find(), req.query).filter();
  const total = await features.query.clone().countDocuments();
  features.sort().limitFields().paginate();
  const products = await features.query;
  res.status(200).json({
    success: true,
    count: total, 
    data: products, 
  });
});


export const getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new CustomError('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    data: product,
  });

});

export const getFilterData = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const categories = await Product.distinct("category");
  const brandFilter = category ? { category } : {};
  const brands = await Product.distinct("brand", brandFilter);

  res.status(200).json({
    success: true,
    data: {
      categories,
      brands,
    },
  });
});

export const createProduct = asyncHandler(async (req, res, next) => {
  const imageLinks = [];

  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const result = await uploadOnCloudinary(file.path);
      if (result) {
        imageLinks.push(result.secure_url);
      }
    }
  }

  const productData = {
    ...req.body,
    images: imageLinks
  };

  const createdProduct = await Product.create(productData);

  res.status(201).json({
    success: true,
    data: createdProduct
  });
});

export const updateProduct = asyncHandler(async (req, res, next) => {
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!updated) return next(new CustomError('Product not found', 404)); 
  
  res.status(200).json({
    success: true,
    data: updated,
  });

});

export const deleteProduct = asyncHandler(async (req, res, next) => {
  const deleted = await Product.findByIdAndDelete(req.params.id);
  if (!deleted) return next(new CustomError('Product not found', 404)); 
  res.status(200).json({ 
    message: 'Product deleted successfully' 
  });
});