import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Rating from '../features/products/components/Rating';
import { fetchProductById } from '../features/products/productService';
import { addToCart } from '../features/cart/cartService';
import { FaChevronDown, FaChevronUp, FaStar, FaCheckSquare } from "react-icons/fa";
import { addReview, getReviewsByProduct, updateReview } from '../features/reviews/reviewService';
import ReviewCard from '../features/reviews/components/ReviewCard';
import useAuth from '../features/auth/hooks/useAuth';
import { logger } from '../utils/logger';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showHighlights, setShowHighlights] = useState(true);
  const [showSpecs, setShowSpecs] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    fetchProductById(id)
      .then(data => {
        setProduct(data.data);
        if (data.data?.images?.length > 0) {
          setSelectedImage(data.data.images[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        toast.error('Failed to fetch product')
      });

    getReviewsByProduct(id)
      .then(data => setReviews(data.data))
      .catch(() => toast.error('Failed to fetch reviews'));
  }, [id]);

  const userReview = reviews.find(r => r.user?._id === user?._id);
  const otherReviews = reviews.filter(r => r.user?._id !== user?._id);

  useEffect(() => {
    if (userReview && isEditing) {
      setUserRating(userReview.rating);
      setUserComment(userReview.comment);
    }
  }, [userReview, isEditing]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <p className="text-xl font-semibold text-gray-700 animate-pulse">Loading product...</p>
      </div>
    );
  }

  
  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
        <p className="text-gray-500 mb-4">
          Sorry, we couldn’t find the product you’re looking for.
        </p>
        <a
          href="/products"
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Go Back
        </a>
      </div>
    );
  }

  const totalReviews = reviews.length;

  const avgRating = totalReviews > 0
    ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / totalReviews
    : 0;

  const starCounts = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
  }));

  const starPercentages = starCounts.map(s => ({
    ...s,
    percent: totalReviews > 0 ? (s.count / totalReviews) * 100 : 0,
  }));

  const barColors = {
    5: 'bg-green-500',
    4: 'bg-lime-400',
    3: 'bg-yellow-400',
    2: 'bg-orange-400',
    1: 'bg-red-400',
  };

  const discountPrice = product.discount 
  ? product.price - (product.price * product.discount) / 100 
  : null;

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please log in to add items to cart");
      return;
    }
    
    try {
      const data = await addToCart(product._id, 1);
      if (data.success) toast.success('Added to cart!');
      else toast.error(data.message || 'Failed to add to cart');
    } catch {
      toast.error('Something went wrong!');
    }
  };

  const handleSubmitReview = async () => {
    if (!userRating) return toast.error('Please select a rating');

    try {
      let data;
      if (userReview) {
        data = await updateReview(userReview._id, {
          productId: product._id,
          rating: userRating,
          comment: userComment,
        });
      } else {
        data = await addReview({
          product: product._id,
          rating: userRating,
          comment: userComment,
        });
      }

      if (data.success) {
        toast.success(userReview ? 'Review updated!' : 'Review submitted!');
        setReviews(prev => {
          if (userReview) return prev.map(r => (r._id === data.data._id ? data.data : r));
          return [...prev, data.data];
        });
        setShowReviewForm(false);
        setIsEditing(false);
        setUserRating(0);
        setUserComment('');
      } else {
        toast.error(data.message || 'Failed to submit review');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <>
      <section className="w-full px-16 pt-10 min-h-[calc(100vh-64px)]">
        <div className="flex flex-col md:flex-row gap-20 justify-between">
          <div className="md:w-1/2 flex gap-4">
            <div className="flex flex-col gap-2 w-28">
              {product.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  onClick={() => setSelectedImage(img)}
                  className={`w-28 h-28 object-cover rounded cursor-pointer border 
                    ${selectedImage === img ? "border-black" : "border-gray-300"}`}
                />
              ))}
            </div>
            <div className="flex-1">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-auto object-contain rounded border border-gray-300"
                />
              ) : (
                <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded">
                  No Image
                </div>
              )}
            </div>
          </div>

          <div className="md:w-5/12 flex flex-col grow gap-3">
            <h1 className="text-3xl font-semibold">{product.name}</h1>
            <div className='flex items-center space-x-2'>
              <Rating rating={avgRating}/>
              <span className="text-gray-600 ">| {totalReviews} reviews</span>
            </div>
            <p className="text-black">{product.description}</p>

            <div className="flex items-center space-x-4">
              {discountPrice ? (
                <>
                  <span className="text-2xl font-bold text-green-500">
                    <span className="font-sans">₹</span>
                    {new Intl.NumberFormat("en-US").format(discountPrice)}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    <span className="font-sans">₹</span>
                    {new Intl.NumberFormat("en-US").format(product.price)}
                  </span>
                  <span className="text-sm font-semibold text-red-500">
                    {product.discount}% OFF
                  </span>
                </>
              ) : (
                <span className="text-2xl font-semibold text-green-500">
                  <span className="font-sans">₹</span>
                  {new Intl.NumberFormat("en-US").format(product.price)}
                </span>
              )}
            
              {product.stock > 0 ? (
                <span className="text-black">| Stock: {product.stock}</span>
              ) : (
                <span className="text-red-500 font-semibold">| Out of Stock</span>
              )}
            </div>

            <div className="text-black space-y-2">
              <p><span className='font-bold'>Brand:</span> {product.brand || 'N/A'}</p>
              <p><span className='font-bold'>Warranty:</span> {product.warranty || 'N/A'}</p>
            </div>

            {product.highlights?.length > 0 && (
              <div className="border border-gray-300 rounded">
                <button
                  onClick={() => setShowHighlights(!showHighlights)}
                  className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 hover:bg-gray-200"
                >
                  <h2 className="text-lg font-semibold">Highlights</h2>
                  {showHighlights ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
                </button>

                {showHighlights && (
                  <ul className="list-disc list-inside space-y-1 p-4 text-gray-700">
                    {product.highlights.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {product.specifications?.length > 0 && (
              <div className="border border-gray-300 rounded">
                <button
                  onClick={() => setShowSpecs(!showSpecs)}
                  className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 hover:bg-gray-200"
                >
                  <h2 className="text-lg font-semibold">Specifications</h2>
                  {showSpecs ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
                </button>

                {showSpecs && (
                  <div className="overflow-x-auto p-4">
                    <table className="w-full text-left border-collapse border border-gray-300">
                      <tbody>
                        {product.specifications.map(({ key, value }, idx) => (
                          <tr key={idx} className="border border-gray-300">
                            <th className="border border-gray-300 px-3 py-1 font-medium bg-gray-100">{key}</th>
                            <td className="border border-gray-300 px-3 py-1">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`px-6 py-3 rounded font-semibold text-base text-center transition-colors
                ${product.stock === 0 
                  ? "bg-gray-400 text-white cursor-not-allowed" 
                  : "bg-blue-600 text-white hover:bg-blue-700"}`}
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </div>
      </section>

      <section className="w-full px-16 mt-10">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-3xl mb-4 sm:mb-0">Customer Reviews</h1>
          {user && !userReview && (
            <button
              className="border border-black text-black text-xs tracking-widest uppercase py-2 px-6 hover:bg-black hover:text-white transition-colors duration-300"
              type="button"
              onClick={() => setShowReviewForm(!showReviewForm)}
            >
              Write a Review
            </button>
          )}
        </header>

        {userReview && !isEditing && ( 
          <div className='flex items-center jus space-x-2'>
            <FaCheckSquare className='bg-white text-green-400 w-5 h-5' />
            <p className="text-gray-600 my-4 underline">You have already reviewed this product.</p>
          </div>
        )}

        {/* Review Summary */}
        <section className="mb-8">
          <div className="w-full mx-auto flex flex-col sm:flex-row sm:space-x-12 shadow-md rounded-md p-6">
            {/* Total Reviews */}
            <div className="flex-1 border-r border-gray-200 pr-6 mb-6 sm:mb-0">
              <p className="text-lg text-gray-900 font-normal mb-1">Total Reviews</p>
              <div className="flex items-center space-x-3">
                <p className="text-3xl font-extrabold text-gray-900">{totalReviews}</p>
              </div>
            </div>

            {/* Average Rating */}
            <div className="flex-1 border-r border-gray-200 pr-6 mb-6 sm:mb-0">
              <p className="text-lg text-gray-900 font-normal mb-1">Average Rating</p>
              <div className="flex items-center space-x-2">
                <p className="text-3xl font-extrabold text-gray-900">{avgRating.toFixed(1)}</p>
                <Rating rating={avgRating} />
              </div>
            </div>

            {/* Rating Bars */}
            <div className="flex-1 flex flex-col justify-center space-y-2">
              {starPercentages.map(s => {
                const widthPercent = s.percent;
                const finalWidth = widthPercent === 0 ? 2 : widthPercent;
                return (
                  <div key={s.star} className="flex items-center space-x-2 text-xs font-semibold text-gray-900">
                    <span className="w-4 text-sm flex justify-end">{s.star}</span>
                    <FaStar className="text-[10px] text-yellow-400" />
                    <div
                      className={`h-2 rounded ${barColors[s.star]}`}
                      style={{ width: `${finalWidth}%` }}
                    ></div>
                    <span className="w-10 ">{s.count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Review Form */}
        {showReviewForm && (
          <div className="my-5 border border-gray-300 p-4 rounded w-full">
            <h3 className="font-semibold mb-2">
              {isEditing ? "Edit Your Review" : "Your Review"}
            </h3>

            {/* Star rating */}
            <div className="flex space-x-1 mb-2">
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  className={`text-xl cursor-pointer ${userRating >= star ? "text-yellow-400" : "text-gray-400"}`}
                  onClick={() => setUserRating(star)}
                >
                  <FaStar />
                </span>
              ))}
            </div>
              
            {/* Textarea */}
            <textarea
              className="w-full border border-gray-300 rounded p-2 mb-2"
              rows={3}
              placeholder="Write your review..."
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
            />

            {/* Action buttons */}
            <div className="flex space-x-3">
              <button
                className="bg-blue-600 text-white font-semibold text-base px-6 py-2 rounded hover:bg-blue-700 text-center"
                onClick={handleSubmitReview}
              >
                {isEditing ? "Update Review" : "Submit Review"}
              </button>
              
              <button
                className="border border-gray-400 text-gray-700 px-4 py-2 rounded hover:bg-gray-100"
                onClick={() => {
                  setShowReviewForm(false);
                  setIsEditing(false);      
                  setUserRating(0);        
                  setUserComment(""); 
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

         {/* Your Review Section */}
         {userReview && !isEditing && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Your Review</h2>
            <ReviewCard
              review={userReview}
              onDeleted={id => setReviews(prev => prev.filter(r => r._id !== id))}
              onEdit={rev => {
                setIsEditing(true);
                setShowReviewForm(true);
                setUserRating(rev.rating);
                setUserComment(rev.comment);
              }}
            />
          </section>
        )}

        {/* All Other Reviews */}
        <section className='max-h-[80vh] overflow-y-auto rounded mb-10'>
          <h2 className="text-lg font-semibold mb-3">All Reviews</h2>
          {otherReviews.length > 0 ? (
            otherReviews.map(rev => (
              <ReviewCard
                key={rev._id}
                review={rev}
                onDeleted={id => setReviews(prev => prev.filter(r => r._id !== id))}
                onEdit={rev => {
                  setIsEditing(true);
                  setShowReviewForm(true);
                  setUserRating(rev.rating);
                  setUserComment(rev.comment);
                }}
              />

        
            ))
          ) : (
            <p className="text-gray-600">No reviews yet</p>
          )}
        </section>
      </section>
    </>
  );
}
