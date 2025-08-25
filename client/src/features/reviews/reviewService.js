import api from "../../services/api";

export const addReview = async (reviewData) => {
  const res = await api.post("/api/v1/reviews", reviewData, { withCredentials: true });
  return res.data;
};

export const updateReview = async (reviewId, reviewData) => {
  const res = await api.put(`/api/v1/reviews/${reviewId}`, reviewData, { withCredentials: true });
  return res.data;
};
  
export const deleteReview = async (reviewId) => {
  const res = await api.delete(`/api/v1/reviews/${reviewId}`, { withCredentials: true });
  return res.data;
};

export const getReviewsByProduct = async (productId) => {
  const res = await api.get(`/api/v1/reviews/product/${productId}`);
  return res.data;
};
