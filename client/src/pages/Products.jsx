import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../features/products/components/ProductCard";
import FilterBar from "../features/products/components/FilterBar";
import Pagination from "../features/products/components/Pagination";
import * as productService from "../features/products/productService";
import {logger} from "../utils/logger"

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const limit = 6;

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const [filters, setFilters] = useState(() => ({
    category: searchParams.get("category") || "",
    brand: searchParams.get("brand") || "",
    inStock: searchParams.get("inStock") === "true" || null,
  }));

  useEffect(() => {
    setFilters({
      category: searchParams.get("category") || "",
      brand: searchParams.get("brand") || "",
      inStock: searchParams.get("inStock") === "true" || null,
    });
  }, [searchParams]);

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
      } catch (error) {
        logger.error("Failed to load products", error);
      }
    };
    fetchProducts();
  }, [currentPage, filters]);

  const handleFilterChange = (newFilters) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", 1);
    if (newFilters.category) params.set("category", newFilters.category);
    else params.delete("category");
    if (newFilters.brand) params.set("brand", newFilters.brand);
    else params.delete("brand");
    if (newFilters.inStock) params.set("inStock", "true");
    else params.delete("inStock");
    setSearchParams(params);
  };

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    setSearchParams(params);
  };

  const totalPages = Math.max(Math.ceil(total / limit), 1);

  return (
    <section className="text-black px-6 py-8 min-h-screen">
      <FilterBar
        categories={categories}
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
