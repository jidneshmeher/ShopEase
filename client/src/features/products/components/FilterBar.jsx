import Dropdown from "../../../components/Dropdown";

export default function FilterBar({ total, categories = [], brands = [], filters, onChange }) {

  return (
    <div className="flex flex-wrap items-center justify-between px-20 py-8 max-w-full gap-4">
      <Dropdown
        label="All Categories"
        options={categories}
        value={filters.category}
        onChange={(val) => onChange({...filters, category:val})}
      />

      <Dropdown
        label="All Brands"
        options={brands}
        value={filters.brand}
        onChange={(val) => onChange({...filters, brand:val})}
      />

      <Dropdown
        label="All Ratings"
        options={["1", "2", "3", "4", "5"]}
        value={filters.rating}
        onChange={(val) => onChange({...filters, rating:val})}
      />

      <label className="flex items-center space-x-2 cursor-pointer whitespace-nowrap">
        <input
          type="checkbox"
          name="inStockOnly"
          checked={filters.inStockOnly}
          // onChange={(val) => onChange({...filters, inStock:val})}
          className="cursor-pointer"
        />
        <span>In Stock Only</span>
      </label>

      <div className="text-gray-600 font-semibold ml-auto mr-6 whitespace-nowrap">{total} Products</div>

      <Dropdown
        label="Sort By"
        options={[
          "Featured",
          "Best Selling",
          "Alphabetically, A-Z",
          "Alphabetically, Z-A",
          "Price, low to high",
          "Price, high to low",
          "Date, old to new",
          "Date, new to old",
        ]}
        value={filters.sortBy}
        onChange={(val) => onChange({ target: { name: "sortBy", value: val } })}
        align="right"
      />
    </div>
  );
}
