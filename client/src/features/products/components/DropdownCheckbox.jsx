import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

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
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    if (window.innerWidth >= 1024) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      if (window.innerWidth >= 1024) {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, []);

  const handleToggle = (option) => {
    let newValue;
    if (value.includes(option)) {
      newValue = value.filter((v) => v !== option);
    } else {
      newValue = [...value, option];
    }
    onChange(newValue);

    if (window.innerWidth >= 1024) {
      setOpen(false);
    }
  };

  return (
    <div className={`relative border-b lg:border-none p-5 lg:p-0 inline-block ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center justify-between w-full lg:py-2 text-sm sm:text-base"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="font-semibold text-xl lg:text-base">
          {label} {value.length > 0 && `(${value.length})`}
        </span>
        {open ? (
          <FaChevronUp className="ml-1 text-gray-600 size-3" />
        ) : (
          <FaChevronDown className="ml-1 text-gray-600 size-3" />
        )}
      </button>

      {open && (  
        <div
        className={`
          mt-2 bg-white lg:border lg:border-gray-200 lg:shadow-lg rounded-md py-5 lg:p-3
          ${ options.length > 10
              ? "grid grid-cols-2 lg:grid-cols-3 gap-3 w-full lg:w-[640px] lg:max-w-[1024px]"
              : "flex flex-col space-y-2 min-w-[200px] max-h-[60vh] overflow-y-auto"
          }
          lg:absolute lg:top-full lg:z-50
        `}
        >
          {options.map((opt) => (
            <label
              key={opt}
              className="flex items-center space-x-2 text-base lg:text-sm font-normal text-gray-900 cursor-pointer"
            >
              <input
                type="checkbox"
                className="w-4 h-4 border-gray-300 rounded shrink-0"
                checked={value.includes(opt)}
                onChange={() => handleToggle(opt)}
              />
              <span className="whitespace-normal break-words">{opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
