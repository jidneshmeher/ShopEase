import Dropdown from "./Dropdown";
import DropdownCheckbox from "./DropdownCheckbox";

export default function FilterBar({ total, brands = [], filters, onChange }) {

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
    <div className="flex flex-wrap items-center justify-between my-5 py-3 px-20 max-w-full gap-4 bg-white sticky top-[64px] z-30">

      <DropdownCheckbox
        label="BRANDS"
        options={brands}
        value={filters.brand}
        onChange={(val) => onChange({...filters, brand:val})}
      />

      <label className="flex font-semibold  items-center space-x-2 cursor-pointer whitespace-nowrap">
        <input
          type="checkbox"
          name="inStockOnly"
          checked={!!filters.inStock}
          onChange={(e) => onChange({...filters, inStock:e.target.checked})}
          className="cursor-pointer"
        />
        <span>IN STOCK ONLY</span>
      </label>

      <div className=" font-semibold ml-auto mr-6 whitespace-nowrap">{total} PRODUCTS</div>

      <Dropdown
        label="SORT BY"
        options={sortLabels}
        value={Object.keys(sortOptions).find(
          key => sortOptions[key] === filters.sort
        )}
        onChange={(label) => onChange({...filters, sort:sortOptions[label]})}
        align="right"
      />
    </div>
  );
}
