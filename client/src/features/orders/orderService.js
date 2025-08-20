import api from "../../services/api";

export const fetchOrders = async () => {
  const res = await api.get("/api/v1/orders");
  return res.data.data;
};

export const placeOrders = async (orderData) => {
  const res = await api.post("/api/v1/orders", orderData);
  return res.data.data;
};