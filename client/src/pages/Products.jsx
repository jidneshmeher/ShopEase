import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../features/products/components/ProductCard";
import FilterBar from "../features/products/components/FilterBar";
import Pagination from "../features/products/components/Pagination";
import * as productService from "../features/products/productService";
import { logger } from "../utils/logger";
import CategoryNav from "../features/products/components/CategoryNav";
import { sanitizeFilters } from "../utils/sanitizeFilters";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const limit = 6;

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const currentPage = parseInt(searchParams.get("page")) || 1;

  const rawFilters = useMemo(
    () => ({
      category: searchParams.get("category") || "",
      brand: searchParams.getAll("brand") || [],
      inStock: searchParams.get("inStock"),
      sort: searchParams.get("sort") || "created-descending",
    }),
    [searchParams]
  );

  const filters = useMemo(
    () => sanitizeFilters(rawFilters, categories, brands),
    [rawFilters, categories, brands]
  );

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.category) params.set("category", filters.category);
    filters.brand.forEach((b) => params.append("brand", b));
    if (filters.inStock) params.set("inStock", "true");
    if (filters.sort) params.set("sort", filters.sort);
    params.set("page", currentPage);

    if (params.toString() !== searchParams.toString()) {
      setSearchParams(params, { replace: true });
    }
  }, [filters, currentPage, searchParams, setSearchParams]);

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const { categories, brands } = await productService.fetchFilterData({
          category: filters.category,
        });
        setCategories(categories);
        setBrands(brands);
      } catch (error) {
        logger.error("Failed to load filter data", error);
      }
    };

    fetchFilterData();
  }, [filters.category]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.fetchProducts({
          page: currentPage,
          limit,
          ...filters,
        });
        setProducts(data.data);
        setTotal(data.count);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        logger.error("Failed to load products", error);
      }
    };
    fetchProducts();
  }, [currentPage, filters]);

  const handleFilterChange = (newFilters) => {
    const params = new URLSearchParams();

    if (newFilters.category) params.set("category", newFilters.category);
    newFilters.brand?.forEach((b) => params.append("brand", b));
    if (newFilters.inStock) params.set("inStock", "true");
    if (newFilters.sort) params.set("sort", newFilters.sort);

    params.set("page", 1);
    setSearchParams(params);
  };

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    setSearchParams(params);
  };

  const totalPages = Math.max(Math.ceil(total / limit), 1);

  return (
    <section className="text-black px-6 min-h-screen">
      <CategoryNav
        categories={categories}
        filters={filters}
        onChange={handleFilterChange}
      />
      <FilterBar
        brands={brands}
        filters={filters}
        total={total}
        onChange={handleFilterChange}
      />

      {products.length === 0 ? (
        <p className="text-center col-span-full mt-10">No products found.</p>
      ) : (
        <div className="px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 gap-y-12">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}
