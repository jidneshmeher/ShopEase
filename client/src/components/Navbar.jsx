import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import useAuth from "../features/auth/hooks/useAuth";
import toast from "react-hot-toast";
import { FiShoppingCart } from "react-icons/fi";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { CircleUserRound } from "lucide-react";
import { logger } from "../utils/logger";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const cartItems = useSelector(state => state.cart.items);
  // const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const headerRef = useRef(null);

  // useGSAP(() => {
  //   gsap.from(".logo, .nav-links a, .right-side", {
  //     y: -50,
  //     opacity: 0,
  //     duration: 0.8,
  //     delay: 0.3,
  //     stagger: 0.2,
  //     ease: "power2.out",
  //   });
  // }, {scope:headerRef});

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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header 
      ref={headerRef}
      className="header h-16 flex justify-between items-center px-8 border-b border-gray-200 sticky top-0 bg-white z-50 shadow-sm"
    >

      <div className="logo font-bold text-xl text-black">
        <Link to="/">SHOPEASE</Link>
      </div>

      <nav className="nav-links flex space-x-8 text-base font-semibold">
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive
              ? "text-black border-b-2 border-black pb-1"
              : "text-gray-900 hover:text-black"
          }
        >
          Products
        </NavLink> 
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-black border-b-2 border-black pb-1"
              : "text-gray-900 hover:text-black"
          }
        >
          About Us
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "text-black border-b-2 border-blue-600 pb-1"
              : "text-gray-900 hover:text-black"
          }
        >
          Contact Us
        </NavLink>
      </nav>

      <div className="right-side flex items-center space-x-6 relative" ref={dropdownRef}>
        <Link
          to="/cart"
          className="relative text-gray-900 hover:text-black"
          aria-label="Cart"
          title="Cart"
        >
          <FiShoppingCart size={24} />
          {/* {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )} */}
        </Link>

        {user ? (
          <>
            <button
              onClick={() => setDropdownOpen(prev => !prev)}
              className="w-10 h-10 rounded-full  flex items-center justify-center text-gray-900 hover:text-black font-semibold cursor-pointer select-none"
              aria-label="User menu"
            >
              <CircleUserRound size={28} />
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
                  onClick={() => { setDropdownOpen(false); handleLogout(); }}
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
            className="bg-blue-600 text-white font-semibold text-base rounded-3xl px-10 py-2 hover:bg-blue-700 transition"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;