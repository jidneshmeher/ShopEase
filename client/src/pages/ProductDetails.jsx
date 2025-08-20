import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Rating from '../features/products/components/Rating';
import { fetchProductById } from '../features/products/productService';
import { addToCart } from '../features/cart/cartService';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showHighlights, setShowHighlights] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);

  useEffect(() => {
    fetchProductById(id)
      .then(data => {
        setProduct(data.data);
        if (data.data?.images?.length > 0) {
          setSelectedImage(data.data.images[0]);
        }
      })
      .catch(() => toast.error('Failed to fetch product'));
  }, [id]);

  if (!product) return <div className="p-8">Loading...</div>;

  const averageRating = product.reviews?.length > 0
    ? product.reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / product.reviews.length
    : 0;

  const handleAddToCart = async () => {
    try {
      const data = await addToCart(product._id, 1);
      if (data.success) {
        toast.success('Added to cart!');
      } else {
        toast.error(data.message || 'Failed to add to cart');
      }
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <>
    <section className="p-8 flex flex-col md:flex-row gap-20 justify-center">
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

      <div className="mt-10 md:w-1/4 flex flex-col gap-3">
        <h1 className="text-3xl font-semibold">{product.name}</h1>

        <div>
          <Rating rating={averageRating} totalReviews={product.reviews?.length || 0} />
        </div>

        <p className="text-black">{product.description}</p>

        <div className="flex items-center space-x-4">
          <span className="text-xl font-semibold text-green-400">
            <sup className="font-sans">₹</sup>
            {new Intl.NumberFormat('en-US').format(product.price)}
          </span>
          <span className="text-black">| Stock: {product.stock}</span>
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

        {/* {product.highlights?.length > 0 && (
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
        )} */}

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
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-900 w-full mt-4"
        >
          Add to Cart
        </button>

      </div>
    </section>
     <section className="w-full  px-16 mt-2">
     <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 px-48">
       <h1 className="font-playfair text-3xl leading-tight mb-4 sm:mb-0">
         Customer Reviews
       </h1>
       <button
         className="border border-black text-black text-xs tracking-widest uppercase py-2 px-6 hover:bg-black hover:text-white transition-colors duration-300"
         type="button"
       >
         Write a Review
       </button>
     </header>

     <section className="mb-6 px-48">
       <div className="flex items-center space-x-2 mb-1">
         <p className="text-2xl font-semibold">{averageRating.toFixed(1)}</p>
         <i className="fas fa-star text-black text-xl"></i>
         <p className="text-sm">{product.reviews?.length || 0} reviews</p>
       </div>
       <hr className="border-t border-gray-300" />
     </section>

     <section className="divide-y divide-gray-300">
       {product.reviews?.map((review, idx) => (
         <article key={idx} className="py-6 flex flex-col sm:flex-row sm:justify-between">
           <div className="flex flex-col text-xs text-black max-w-[120px] mb-4 sm:mb-0">
             <span className="mb-1">{review.user || "Anonymous"}</span>
             <span className="flex items-center mb-1">
               <i className="fas fa-check-circle text-black mr-1 text-[10px]"></i>
               Verified Buyer
             </span>
             <span className="flex items-center">
               <i className="fas fa-check text-black mr-1 text-[10px]"></i>
               I recommend this product
             </span>
           </div>

           <div className="flex-1">
             <div className="flex items-center mb-1 space-x-1 text-black text-xl">
               {[...Array(review.rating)].map((_, i) => (
                 <i key={i} className="fas fa-star"></i>
               ))}
             </div>
             <div className="flex justify-between text-xs text-black mb-2">
               <p className="font-normal max-w-[calc(100%-100px)] truncate">
                 {review.comment?.slice(0, 30)}...
               </p>
               <p className="whitespace-nowrap">{review.time || "Just now"}</p>
             </div>
             <p className="text-xs mb-3 max-w-[600px]">{review.comment}</p>
             <div className="text-xs text-black flex items-center space-x-2 max-w-[600px]">
               <span>Was this review helpful?</span>
               <i className="fas fa-thumbs-up cursor-pointer"></i>
               <span>0</span>
               <i className="fas fa-thumbs-down cursor-pointer"></i>
               <span>0</span>
             </div>
           </div>
         </article>
       ))}
     </section>
   </section>
   </>
  );
};

export default ProductDetails;
