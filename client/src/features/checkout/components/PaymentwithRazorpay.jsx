import React, { useEffect, useState } from 'react';
import { createRazorpayOrder, verifyRazorpayPayment } from '../checkoutService.js';
import Processing from './Processing';
import {logger} from "../../../utils/logger.js"

const PaymentWithRazorpay = ({ orderData, onPaymentSuccess, onPaymentError, validateForm }) => {
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById('razorpay-script')) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.id = 'razorpay-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadRazorpayScript().then((loaded) => {
      setScriptLoaded(loaded);
      if (!loaded) {
        onPaymentError('Failed to load Razorpay script');
      }
    });
  }, [onPaymentError]);

  const handlePayment = async () => {
    if (!validateForm()) return;
    if (!scriptLoaded) {
      onPaymentError('Payment script not loaded');
      return;
    }

    setLoading(true);

    try {
      const data = await createRazorpayOrder(orderData);
      if (!data.success) {
        setLoading(false);
        onPaymentError('Failed to create order');
        return;
      }

      const { razorpayOrderId, razorpayKeyId, amount, currency, orderId } = data.data;

      const options = {
        key: razorpayKeyId,
        amount: amount.toString(),
        currency,
        name: 'ShopEase',
        description: 'Purchase from ShopEase',
        order_id: razorpayOrderId,
        handler: async (response) => {
          try {
            const verifyRes = await verifyRazorpayPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderItems: orderData.orderItems,
              shippingAddress: orderData.shippingAddress,
              userId: orderData.userId,
              email: orderData.email,
            });

            if (verifyRes.success) {
              onPaymentSuccess(orderId);
            } else {
              onPaymentError('Payment verification failed');
            }
          } catch {
            onPaymentError('Error verifying payment');
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            onPaymentError('Payment cancelled');
            setLoading(false);
          },
        },
        prefill: {
          email: orderData.email || '',
        },
        theme: {
          color: '#2563eb',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      logger.log(err)
      setLoading(false);
      onPaymentError('Payment initiation failed');
    }
  };

  return (
    <>
    <button
      onClick={handlePayment}
      disabled={loading}
      className="mt-6 w-full rounded-md px-6 py-3 font-medium text-white bg-gray-900 hover:bg-black"
    >
      {loading ? 'Processing...' : 'Place Order'}
    </button>
    <Processing visible={loading} />
    </>
  );
};

export default PaymentWithRazorpay;
