import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: { 
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount:{
      type: Number
    },
    stock: {
      type: Number,
      default: 0,
    },
    images: [String],
    highlights: [String],
    specifications: [
      {
        key: String,
        value: String, 
      },
    ],
    brand: {
      type: String,
      trim: true,
    },
    warranty: {
      type: String,
      trim: true,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
