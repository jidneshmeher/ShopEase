import api from "../../services/api";

export const login = async (email, password) => {
  const res = await api.post("/api/v1/auth/login", { email, password });
  return res.data;
};

export const register = async (name, email, password, phone) => {
  const res = await api.post("/api/v1/auth/register", { name, email, password, phone});
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await api.get("/api/v1/auth/me");
  return res.data;
};

export const logout = async () => {
  await api.post("/api/v1/auth/logout");
};

export const updateUserProfile = async (userData) => {
  const res = await api.put('/api/v1/users/profile', userData, { withCredentials: true });
  return res.data;
};
