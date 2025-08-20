import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getFilterData,
  } from '../controllers/productController.js';
import { upload } from "../middlewares/multerMiddleware.js";
import protect from "../middlewares/authMiddleware.js"
import admin from "../middlewares/adminMiddleware.js";

const router = Router();

router.route('/')
  .post(protect, admin, upload.array('image', 4), createProduct)
  .get(getAllProducts)

router.route('/filters')
  .get(getFilterData)

router.route('/:id')
  .get(getProductById)
  .put(protect, admin, upload.array('image', 4), updateProduct)
  .delete(protect, deleteProduct)

export default router