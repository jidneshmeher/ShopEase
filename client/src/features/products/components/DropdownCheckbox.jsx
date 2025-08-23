import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoClose } from "react-icons/io5"; 
import { logger } from "../../../utils/logger";

export default function DropdownCheckbox({
  label,
  options = [],
  value = "",
  onChange,
  align = "left",
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = (option) => {
    let newValue;
    if (value.includes(option)) {
      newValue = value.filter((v) => v !== option);
    } else {
      newValue = [...value, option];
    }
    onChange(newValue);
    setOpen(false);
  };

  const handleRemove = (option) => {
    onChange(value.filter((v) => v !== option));
  };

  const handleClear = () => {
    onChange([]);
  };

  return (
    <div className={`relative mr-6 inline-block ${className}`} ref={dropdownRef}>
      {/* Dropdown trigger */}
      <button
        type="button"
        className="flex items-center py-2"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="font-semibold">
          {label} {value.length > 0 && `(${value.length})`}
        </span>
        {open ? (
          <FaChevronUp className="ml-1 text-gray-600 size-2" />
        ) : (
          <FaChevronDown className="ml-1 text-gray-600 size-2" />
        )}
      </button>

      {/* Dropdown options */}
      {open && (
        <div
          className={`absolute top-full mt-1 bg-white border border-gray-200 shadow-lg rounded-md p-4 z-50
          ${align === "right" ? "right-0" : "left-0"}
          ${
            options.length > 10
              ? "grid grid-cols-3 gap-x-5 gap-y-5 w-screen max-w-[1024px]"
              : "flex flex-col space-y-3 min-w-[200px]"
          }`}
        >
          {options.map((opt) => (
            <label
              key={opt}
              className="flex items-center space-x-2 text-sm font-normal text-gray-900 cursor-pointer"
            >
              <input
                type="checkbox"
                className="w-5 h-5 border-gray-300 rounded shrink-0"
                checked={value.includes(opt)}
                onChange={() => handleToggle(opt)}
              />
              <span className="whitespace-normal break-words">{opt}</span>
            </label>
          ))}
        </div>
      )}

      {/* Selected chips */}
      {/* {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {value.map((val) => (
            <span
              key={val}
              className="flex items-center px-3 py-1 bg-gray-100 text-sm rounded-full border border-gray-300"
            >
              <IoClose
                className="mr-1 cursor-pointer text-gray-600"
                onClick={() => handleRemove(val)}
              />
              {val}
            </span>
          ))}

          <button
            onClick={handleClear}
            className="text-sm text-blue-600 hover:underline ml-2"
          >
            Clear All
          </button>
        </div>
      )} */}
    </div>
  );
}
