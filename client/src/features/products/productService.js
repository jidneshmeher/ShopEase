import api from "../../services/api";
import { logger } from "../../utils/logger";

export const fetchProducts = async ({
  page = 1,
  limit = 6,
  category = "",
  brand = [],
  inStock = null,
  sort = "",
}) => {
  const params = new URLSearchParams();
  params.set("page", page);
  params.set("limit", limit);

  if (category) params.set("category", category);
  if (brand) brand.forEach(b => params.append("brand", b));
  if (inStock === true) params.set("inStock", "true");
  if (sort) params.set("sort", sort);

  const res = await api.get(`/api/v1/products?${params.toString()}`);
  return res.data;
};


export const fetchProductById = async (id) => {
  const res = await api.get(`/api/v1/products/${id}`);
  return res.data;
};

export const fetchFilterData = async ({ category = "" } = {}) => {
  const params = new URLSearchParams();
  if (category) params.set("category", category);

  const res = await api.get(`/api/v1/products/filters?${params.toString()}`);
  return res.data.data;
};
