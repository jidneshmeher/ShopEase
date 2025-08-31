import { useState } from "react";
import Dropdown from "./Dropdown";
import DropdownCheckbox from "./DropdownCheckbox";
import { IoFilter } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { GrClose } from "react-icons/gr";

export default function FilterBar({ total, brands = [], filters, onChange }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState(filters);

  const sortOptions = {
    "Alphabetically, A-Z": "title-ascending",
    "Alphabetically, Z-A": "title-descending",
    "Price, low to high": "price-ascending",
    "Price, high to low": "price-descending",
    "Date, old to new": "created-ascending",
    "Date, new to old": "created-descending",
  };

  const sortLabels = Object.keys(sortOptions);

  return (
    <div className="bg-white lg:sticky lg:top-[64px] z-30 w-full">
      {/* Desktop Filter Bar */}
      <div className="hidden lg:flex flex-wrap items-center justify-between py-3">
        <div className="flex flex-wrap items-center gap-8">
          <DropdownCheckbox
            label="BRANDS"
            options={brands}
            value={filters.brand}
            onChange={(val) => onChange({ ...filters, brand: val })}
          />

          <label className="flex items-center space-x-2 cursor-pointer font-semibold whitespace-nowrap text-sm sm:text-base">
            <input
              type="checkbox"
              name="inStockOnly"
              checked={!!filters.inStock}
              onChange={(e) => onChange({ ...filters, inStock: e.target.checked })}
              className="cursor-pointer"
            />
            <span>IN STOCK ONLY</span>
          </label>
        </div>
        <div className="flex items-center gap-8">
          <div className="font-semibold whitespace-nowrap text-sm sm:text-base">
            {total} PRODUCTS
          </div>

          <Dropdown
            label="SORT BY"
            options={sortLabels}
            value={Object.keys(sortOptions).find(
              (key) => sortOptions[key] === filters.sort
            )}
            onChange={(label) => onChange({ ...filters, sort: sortOptions[label] })}
            align="right"
          />
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="flex lg:hidden items-center justify-between py-3 ">
        <button
          onClick={() => setSidebarOpen(true)}
          className=" flex items-center text-black px-4 py-2 rounded-md font-semibold gap-2 hover:bg-gray-200 "
        >
          <IoFilter/>
          FILTERS
        </button>
        <div className="font-semibold">{total} PRODUCTS</div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[60] flex">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="bg-white w-full sm:w-1/2 max-w-full h-full overflow-y-auto
                          transform transition-transform duration-300 ease-in-out translate-x-0 flex flex-col justify-between">
            <div className="flex flex-col">
              <div className="flex items-center justify-between p-5 border-b">
                <h2 className="font-semibold text-xl">Filters</h2>
                <button
                  className="text-gray-700 font-bold text-2xl hover:text-black"
                  onClick={() => setSidebarOpen(false)}
                >
                  <GrClose className="size-3"/>
                </button>
              </div>
              <DropdownCheckbox
                label="Brands"
                options={brands}
                value={tempFilters.brand}
                onChange={(val) => setTempFilters({ ...tempFilters, brand: val })}
              />
              <DropdownCheckbox
                label="Sort"
                options={sortLabels}
                value={tempFilters.sort ? [Object.keys(sortOptions).find(
                  (key) => sortOptions[key] === tempFilters.sort
                )] : []}
                onChange={(val) =>
                  setTempFilters({
                    ...tempFilters,
                    sort: sortOptions[val[val.length - 1]],
                  })
                }
                align="left"
              />
              <label className="flex items-center border-b lg:border-none p-5 space-x-2 text-xl lg:text-base cursor-pointer font-semibold lg:mt-6">
                <span>In Stock Only</span>
                <input
                  type="checkbox"
                  checked={!!tempFilters.inStock}
                  onChange={(e) =>
                    setTempFilters({ ...tempFilters, inStock: e.target.checked })
                  }
                  className="cursor-pointer"
                />
              </label>
            </div>
            <button
              className="m-5 bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
              onClick={() => {
                onChange(tempFilters);
                setSidebarOpen(false); 
              }}
            >
              Apply
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
