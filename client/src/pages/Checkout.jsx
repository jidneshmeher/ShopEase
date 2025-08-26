import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import PaymentWithRazorpay from '../features/checkout/components/PaymentWithRazorpay';
import Processing from '../features/checkout/components/Processing';

import useAuth from '../features/auth/hooks/useAuth';
import useCart from "../features/cart/hooks/useCart";

import { useDispatch } from 'react-redux';
import { clearCartThunk } from '../features/cart/cartSlice';
import PhoneInput from "react-phone-input-2";
import { validatePhoneNumber } from '../utils/phone';
import { placeOrders as placeOrderApi } from '../features/orders/orderService';

export default function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items: cartItems } = useCart();
  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phoneNumber: user?.phone || '',
    street: user?.address?.[0]?.street || '',
    city: user?.address?.[0]?.city || '',
    state: user?.address?.[0]?.state || '',
    zip: user?.address?.[0]?.zipCode || '',
    country: user?.address?.[0]?.country || '',
  });

  const [showProcessing, setShowProcessing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentSelect = (method) => setPaymentMethod(method);

  const validateForm = () => {
    const { name, street, city, state, zip, country, phoneNumber } = formData;

    if (!name.trim() || !street.trim() || !city.trim() || !state.trim() || !zip.trim() || !country.trim()) {
      toast.error("Please fill all delivery details.");
      return false;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      toast.error("Please enter a valid phone number with country code.");
      return false;
    }
    if (!paymentMethod) {
      toast.error("Please select a payment method.");
      return false;
    }

    const outOfStock = cartItems.some(item => item.product.stock === 0);
    if (outOfStock) {
      toast.error("Some items in your cart are out of stock. Please remove them before placing the order.");
      return false;
    }

    return true;
  };

  const calculatePrice = (product) => {
    return product.discount
      ? product.price - (product.price * product.discount) / 100
      : product.price;
  };

  const placeOrder = async () => {
    if (!validateForm()) return;
  
    setShowProcessing(true);
  
    const orderData = {
      orderItems: cartItems.map(({ product, quantity }) => ({
        product: product._id,
        productName: product.name,
        quantity,
        price: calculatePrice(product),
      })),
      shippingAddress: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zip,
        country: formData.country,
      },
      userId: user?._id,
      totalPrice: cartItems.reduce((acc, item) => acc + calculatePrice(item.product) * item.quantity, 0),
      email: user?.email,
    };
  
    try {
      await placeOrderApi(orderData);
      toast.success("Order placed successfully!");
      dispatch(clearCartThunk())
        .unwrap()
        .then(() => navigate("/orders"))
        .catch(() => {
          toast.error("Failed to clear cart after order. Please refresh.");
          navigate("/orders");
        });
    } catch (err) {
      toast.error(err?.message || "Failed to place order.");
    } finally {
      setShowProcessing(false);
    }
  };

  const razorpayOrderData = {
    orderItems: cartItems.map(({ product, quantity }) => ({
      product: product._id,
      productName: product.name,
      quantity,
      price: calculatePrice(product),
    })),
    shippingAddress: {
      street: formData.street,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zip,
      country: formData.country,
    },
    userId: user?._id || '',
    totalPrice: cartItems.reduce((acc, item) => acc + calculatePrice(item.product) * item.quantity, 0),
    email: user?.email || '',
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col lg:flex-row gap-10 max-w-full mx-auto my-10 px-4 sm:px-10 lg:px-20 xl:px-32">
        <div className="flex-1 space-y-6">
          <section className="px-4 pt-8 rounded-lg shadow space-y-4 py-5">
            <h2 className="text-xl font-semibold ">Shipping Methods</h2>
            <form className="space-y-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="shipping"
                  className="form-radio h-5 w-5 text-blue-600"
                  checked={true}
                  readOnly
                />
                <div>
                  <p className="font-semibold">Normal Delivery</p>
                  <p className="text-sm text-gray-500">Delivery: 5-10 Days</p>
                </div>
              </label>
            </form>
          </section>

          <section className="px-4 py-6 bg-white rounded-lg shadow space-y-6">
            <h2 className="text-xl font-semibold">Contact Details</h2>
            <form className="space-y-4 mt-3">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                <PhoneInput
                  country={"in"}
                  value={formData.phoneNumber || user?.phone || ''}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, phoneNumber: "+" + value }))
                  }
                  enableSearch={true}
                  countryCodeEditable={false}
                />
              </div>
            </form>
          </section>
                
          <section className="px-4 py-6 bg-white rounded-lg shadow space-y-6">
            <h2 className="text-xl font-semibold">Delivery Details</h2>
            <form className="space-y-4 mt-3">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="w-full border-b border-gray-300 py-2 focus:outline-none"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
                
              <div>
                <label className="block text-gray-700 font-medium mb-1">Street Address</label>
                <input
                  type="text"
                  name="street"
                  placeholder="Street Address"
                  className="w-full border-b border-gray-300 py-2 focus:outline-none"
                  value={formData.street}
                  onChange={handleChange}
                />
              </div>
                
              <div>
                <label className="block text-gray-700 font-medium mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="w-full border-b border-gray-300 py-2 focus:outline-none"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
                
              <div>
                <label className="block text-gray-700 font-medium mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  className="w-full border-b border-gray-300 py-2 focus:outline-none"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
                
              <div>
                <label className="block text-gray-700 font-medium mb-1">ZIP Code</label>
                <input
                  type="text"
                  name="zip"
                  placeholder="ZIP Code"
                  className="w-full border-b border-gray-300 py-2 focus:outline-none"
                  value={formData.zip}
                  onChange={handleChange}
                />
              </div>
                
              <div>
                <label className="block text-gray-700 font-medium mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  className="w-full border-b border-gray-300 py-2 focus:outline-none"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>
            </form>
          </section>

          <section className="px-4 py-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold">Payment Details</h2>
            <p className="text-gray-500 mt-6">Complete your order by selecting a payment method.</p>

            <div className="flex flex-col space-y-6 mt-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  className="form-radio h-5 w-5 text-blue-600"
                  onChange={() => handlePaymentSelect('cash')}
                  checked={paymentMethod === 'cash'}
                />
                <span>Cash on Delivery</span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  className="form-radio h-5 w-5 text-blue-600"
                  onChange={() => handlePaymentSelect('razorpay')}
                  checked={paymentMethod === 'razorpay'}
                />
                <span>Pay with Razorpay</span>
              </label>
            </div>

            {paymentMethod === 'cash' && (
              <button
                onClick={placeOrder}
                className="mt-6 w-full rounded-md px-6 py-3 font-medium text-white bg-gray-900 hover:bg-black"
              >
                Place Order
              </button>
            )}

            {paymentMethod === 'razorpay' && (
              <PaymentWithRazorpay
                orderData={razorpayOrderData}
                onPaymentSuccess={() => {
                  toast.success('Payment Successful! Order placed.');
                  dispatch(clearCartThunk())
                    .unwrap()
                    .then(() => navigate('/orders'))
                    .catch(() => {
                      toast.error('Payment succeeded but failed to clear cart. Please refresh.');
                      navigate('/orders');
                    });
                }}
                onPaymentError={(msg) => toast.error(`Payment failed: ${msg}`)}
                validateForm={validateForm}
              />
            )}

            <Processing visible={showProcessing} />
          </section>
        </div>

        <div className="w-full lg:w-1/3 p-6 pt-0 mt-6 lg:mt-0 rounded shadow flex flex-col justify-between h-max text-gray-900">
          <h3 className="text-xl font-semibold my-6 py-2">Order Summary</h3>
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 mt-6">Your cart is empty.</p>
          ) : (
            cartItems.map(({ product, quantity }) => {
              const price = calculatePrice(product);
              return (
                <div key={product._id} className="flex items-center space-x-4 border-b pb-4 last:border-none">
                  <img src={product.images?.[0]} alt={product.name} className="w-28 h-28 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-lg font-bold">
                      {product.discount ? (
                        <>
                          <span className="line-through text-gray-500 mr-2">₹{product.price.toLocaleString()}</span>
                          <span className="text-green-600">₹{price.toLocaleString()}</span>
                        </>
                      ) : (
                        <>₹{price.toLocaleString()}</>
                      )}
                    </p>

                    <p className="text-sm text-gray-600">Qty: {quantity}</p>
                    {product.stock === 0 && (
                      <p className="text-red-500 font-semibold mt-1">Out of Stock</p>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
