const VALID_SORTS = [
  "featured",
  "best-selling",
  "title-ascending",
  "title-descending",
  "price-ascending",
  "price-descending",
  "created-ascending",
  "created-descending",
];

export const sanitizeFilters = (rawFilters, categories, brands) => {
  return {
    category: categories.includes(rawFilters.category) ? rawFilters.category : "",
    brand: rawFilters.brand.filter((b) => brands.includes(b)),
    inStock: rawFilters.inStock === "true" ? true : null,
    sort: VALID_SORTS.includes(rawFilters.sort) ? rawFilters.sort : "created-descending",
  };
};