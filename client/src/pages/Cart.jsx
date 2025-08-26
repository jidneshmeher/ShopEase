import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCartThunk, removeItemThunk, updateQuantityThunk } from '../features/cart/cartSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import deleteIcon from '../assets/svg/delete-icon.svg';
import addIcon from '../assets/svg/add-icon.svg';
import removeIcon from '../assets/svg/remove-icon.svg';
import useCart from "../features/cart/hooks/useCart";
import { logger } from "../utils/logger";

const SHIPPING_FEE = 150;
const FREE_SHIPPING_THRESHOLD = 15000;

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useCart();

  const [updatingItemIds, setUpdatingItemIds] = useState(new Set());
  const [removingItemIds, setRemovingItemIds] = useState(new Set());

  useEffect(() => {
    dispatch(fetchCartThunk());
  }, [dispatch]);

  if (loading) return <div>Loading cart...</div>;
  if (error) return <div>Error loading cart: {error}</div>;

  // Calculate subtotal using discounted price if available
  const subtotal = items.reduce((sum, item) => {
    const price = item.product.discount
      ? item.product.price - (item.product.price * item.product.discount) / 100
      : item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const shippingCost = items.length > 0
    ? (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE)
    : 0;

  const total = subtotal + shippingCost;
  const amountLeft = FREE_SHIPPING_THRESHOLD - subtotal;

  const handleRemove = (productId) => {
    setRemovingItemIds((prev) => new Set(prev).add(productId));
    dispatch(removeItemThunk(productId))
      .unwrap()
      .then(() => toast.success('Item removed from cart'))
      .catch(() => toast.error('Failed to remove item'))
      .finally(() => {
        setRemovingItemIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
      });
  };

  const handleQuantityChange = (productId, quantity, stock) => {
    if (quantity < 1 || quantity > stock) return;
    setUpdatingItemIds((prev) => new Set(prev).add(productId));
    dispatch(updateQuantityThunk({ productId, quantity }))
      .unwrap()
      .then(() => toast.success('Quantity updated'))
      .catch((err) => {
        logger.error(err);
        toast.error('Failed to update quantity');
      })
      .finally(() => {
        setUpdatingItemIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
      });
  };

  return (
    <div className="flex md:flex-row flex-col gap-8 p-8 px-20 bg-white min-h-screen">
      {/* Cart Items */}
      <div className="md:w-2/3 space-y-6 p-6">
        <h3 className="text-2xl font-bold mb-6 border-b py-2">Your Cart</h3>

        {items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          items.map(({ product, quantity }) => {
            const isUpdating = updatingItemIds.has(product._id);
            const isRemoving = removingItemIds.has(product._id);
            const discountPrice = product.discount
              ? product.price - (product.price * product.discount) / 100
              : product.price;

            return (
              <div key={product._id} className="flex gap-4 border-b pb-4">
                <img src={product.images?.[0]} alt={product.name} className="w-44 h-44 object-cover rounded" />
                <div className="flex-1">
                  <div className='flex items-center justify-between'>
                    <h2 className="font-bold text-lg text-gray-900">{product.name}</h2>
                    <p className="text-gray-900 font-bold text-lg">
                      {product.discount ? (
                        <>
                          <span className="text-gray-900 font-bold text-lg">₹{discountPrice.toLocaleString()}</span>
                        </>
                      ) : (
                        <>₹{product.price.toLocaleString()}</>
                      )}
                    </p>
                  </div>

                  <p className="text-base text-gray-800">{product.description}</p>

                  {product.stock === 0 && (
                    <p className="text-red-500 font-semibold mt-1">Out of Stock</p>
                  )}

                  <div className="mt-2 flex items-center gap-2">
                    <label className="mr-2">Qty:</label>
                    <div className="flex items-center gap-2">
                      {quantity > 1 ? (
                        <button
                          onClick={() => handleQuantityChange(product._id, quantity - 1, product.stock)}
                          disabled={isUpdating || isRemoving || product.stock === 0}
                          className={`px-2 py-1 border rounded ${isUpdating || isRemoving || product.stock === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
                        >
                          <img src={removeIcon} alt="Remove" className="w-5 h-5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRemove(product._id)}
                          disabled={isRemoving || isUpdating}
                          className={`px-2 py-1 border rounded text-red-600 hover:bg-red-100 ${isRemoving ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
                        </button>
                      )}

                      <input
                        type="text"
                        readOnly
                        value={quantity}
                        className="w-12 text-center border rounded px-2 py-1 bg-gray-100 cursor-default"
                      />

                      <button
                        onClick={() => handleQuantityChange(product._id, quantity + 1, product.stock)}
                        disabled={isUpdating || isRemoving || product.stock === 0}
                        className={`px-2 py-1 border rounded ${isUpdating || isRemoving || product.stock === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
                      >
                        <img src={addIcon} alt="Add" className="w-5 h-5" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemove(product._id)}
                      disabled={isRemoving || isUpdating}
                      className={`text-red-500 underline text-sm ${isRemoving ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isRemoving ? 'Removing...' : 'Remove'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Order Summary */}
      <div className="md:w-1/3 p-6 pt-0 mt-6 rounded shadow flex flex-col justify-between h-max text-gray-900" >
        <div>
          <h3 className="text-2xl font-bold mb-6 py-2">Order Summary</h3>
          <p className="text-lg flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </p>
          <p className="text-lg flex justify-between mt-4">
            <span>Shipping</span>
            <span>₹{shippingCost.toLocaleString()}</span>
          </p>
          <hr className="my-4" />
          <p className="text-xl font-bold flex justify-between">
            <span>Total</span>
            <span>₹ {total.toLocaleString()}</span>
          </p>

          {items.length > 0 && subtotal < FREE_SHIPPING_THRESHOLD && (
            <div className="mt-6">
              <p className="text-sm text-gray-700 mb-2 font-medium">
                Just <span className="font-bold text-gray-950">₹ {amountLeft.toLocaleString()}</span> away from Free Shipping
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          )}

          <button
            onClick={() => navigate('/checkout')}
            className="mt-6 bg-gray-900 text-white py-3 w-full rounded hover:bg-gray-950"
            disabled={items.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
