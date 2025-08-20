import api from '../../services/api'; 

export const fetchCart = async () => {
  const res = await api.get('/api/v1/cart');
  return res.data;  
};

export const removeItem = async (productId) => {
  const res = await api.delete(`/api/v1/cart/item/${productId}`);
  return res.data;
};

export const updateItemQuantity = async (productId, quantity) => {
  const res = await api.patch(`/api/v1/cart/item/${productId}`, { quantity });
  return res.data;
};

export const addToCart = async (productId, quantity = 1) => {
  const res = await api.post('/api/v1/cart', { productId, quantity });
  return res.data;
};

export const clearCart = async () => {
  const res = await api.delete('/api/v1/cart/clear');
  return res.data;
};