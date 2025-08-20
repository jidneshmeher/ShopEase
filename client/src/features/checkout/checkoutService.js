import api from '../../services/api';

export const createRazorpayOrder = async (orderData) => {
  const res = await api.post('/api/v1/payments/create-order', orderData, { withCredentials: true });
  return res.data;
};

export const verifyRazorpayPayment = async (paymentData) => {
  const res = await api.post('/api/v1/payments/verify-payment', paymentData, { withCredentials: true });
  return res.data;
};