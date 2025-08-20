import api from "../../services/api";

export const fetchProducts = async ({
  page = 1,
  limit = 5,
  category = "",
  brand = "",
  inStock = null,
}) => {
  const params = new URLSearchParams();
  params.set("page", page);
  params.set("limit", limit);

  if (category) params.set("category", category);
  if (brand) params.set("brand", brand);
  if (inStock === true) params.set("inStock", "true");


  const res = await api.get(`/products?${params.toString()}`);
  return res.data;
};

export const fetchProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

export const fetchFilterData = async ({ category = "" } = {}) => {
  const params = new URLSearchParams();
  if (category) params.set("category", category);

  const res = await api.get(`/products/filters?${params.toString()}`);
  return res.data.data;
};
