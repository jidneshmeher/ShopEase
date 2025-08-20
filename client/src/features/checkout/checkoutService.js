import api from '../../services/api';

export const createRazorpayOrder = async (orderData) => {
  const res = await api.post('payments/create-order', orderData, { withCredentials: true });
  return res.data;
};

export const verifyRazorpayPayment = async (paymentData) => {
  const res = await api.post('payments/verify-payment', paymentData, { withCredentials: true });
  return res.data;
};