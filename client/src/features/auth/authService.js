import api from "../../services/api";

export const login = async (email, password) => {
  const res = await api.post("auth/login", { email, password });
  return res.data;
};

export const register = async (name, email, password, phone) => {
  const res = await api.post("auth/register", { name, email, password, phone});
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await api.get("auth/me");
  return res.data;
};

export const logout = async () => {
  await api.post("auth/logout");
};

export const updateUserProfile = async (userData) => {
  const res = await api.put('/users/profile', userData, { withCredentials: true });
  return res.data;
};
