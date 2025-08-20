import api from "../../services/api";

export const fetchOrders = async () => {
  const res = await api.get("/orders");
  return res.data.data;
};

export const placeOrders = async (orderData) => {
  const res = await api.post("/orders", orderData);
  return res.data.data;
};