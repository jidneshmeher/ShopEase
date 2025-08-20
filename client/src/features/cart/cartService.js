import api from '../../services/api'; 

export const fetchCart = async () => {
  const res = await api.get('/cart');
  return res.data;  
};

export const removeItem = async (productId) => {
  const res = await api.delete(`/cart/item/${productId}`);
  return res.data;
};

export const updateItemQuantity = async (productId, quantity) => {
  const res = await api.patch(`/cart/item/${productId}`, { quantity });
  return res.data;
};

export const addToCart = async (productId, quantity = 1) => {
  const res = await api.post('/cart', { productId, quantity });
  return res.data;
};

export const clearCart = async () => {
  const res = await api.delete('/cart/clear');
  return res.data;
};