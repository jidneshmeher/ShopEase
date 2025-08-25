import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import useAuth from "../features/auth/hooks/useAuth";
import toast from "react-hot-toast";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { LuCircleUserRound } from "react-icons/lu";
import { logger } from "../utils/logger";

export default function Navbar(){
  const dispatch = useDispatch();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const cartItems = useSelector((state) => state.cart.items);

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/");
      })
      .catch((err) => {
        logger.error("Logout failed:", err);
        toast.error("Logout failed, please try again");
      });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header h-16 flex justify-between items-center px-4 sm:px-16 border-b border-gray-200 sticky top-0 bg-white z-50 shadow-sm">
      {/* Logo */}
      <div className="logo font-bold text-xl text-black">
        <Link to="/">SHOPEASE</Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-8 text-base font-semibold">
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive
              ? "text-black border-b-2 border-black pb-1"
              : "text-gray-900 hover:text-black"
          }
        >
          PRODUCTS
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-black border-b-2 border-black pb-1"
              : "text-gray-900 hover:text-black"
          }
        >
          ABOUT US
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "text-black border-b-2 border-blue-600 pb-1"
              : "text-gray-900 hover:text-black"
          }
        >
          CONTACT US
        </NavLink>
      </nav>

      {/* Right Side */}
      <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
        {/* Cart */}
        <Link
          to="/cart"
          className="relative text-gray-900 hover:text-black"
          aria-label="Cart"
          title="Cart"
        >
          <FiShoppingCart size={24} />
        </Link>

        {/* User Menu / Login */}
        {user ? (
          <>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-900 hover:text-black font-semibold cursor-pointer select-none"
              aria-label="User menu"
            >
              <LuCircleUserRound size={28} />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-300 rounded shadow-md z-50">
                <Link
                  to="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  My Profile
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  My Cart
                </Link>
                <Link
                  to="/orders"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  My Orders
                </Link>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <Link
            to="/login"
            className="hidden md:inline-block bg-blue-600 text-white font-semibold text-base rounded-3xl px-6 py-2 hover:bg-blue-700 transition"
          >
            LOGIN
          </Link>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-900 hover:text-black"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Mobile menu"
        >
          {mobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-md md:hidden z-40">
          <div className="flex flex-col px-4 py-4 space-y-2">
            <NavLink
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-black font-semibold"
                  : "text-gray-900 hover:text-black"
              }
            >
              PRODUCTS
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-black font-semibold"
                  : "text-gray-900 hover:text-black"
              }
            >
              ABOUT US
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-black font-semibold"
                  : "text-gray-900 hover:text-black"
              }
            >
              CONTACT US
            </NavLink>
            {!user && (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-blue-600 text-white font-semibold text-base rounded-3xl px-6 py-2 hover:bg-blue-700 text-center"
              >
                LOGIN
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};
