import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function Dropdown({
  label,
  options = [],
  value,
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

  const handleSelect = (option) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center py-2 text-sm sm:text-base"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="font-semibold">{label}:</span>
        <span className="ml-1">{value}</span>
        <FaChevronDown className="ml-2 text-gray-600 size-3" />
      </button>

      {open && (
        <div
          className={`
            absolute mt-1 bg-white border rounded shadow-lg z-50
            min-w-[160px] sm:min-w-[200px]
            ${align === "right" ? "right-0" : "left-0"}
          `}
        >
          {options.map((opt) => (
            <div
              key={opt}
              className="whitespace-nowrap px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
