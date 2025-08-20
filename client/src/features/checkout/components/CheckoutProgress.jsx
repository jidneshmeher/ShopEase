import React from "react";
import { Link } from "react-router-dom";

export default function CheckoutProgress({ shippingSelected, detailsValid }) {
  return (
    <header className="header h-16 flex flex-col sm:flex-row justify-between items-center px-8 border-b border-gray-200 sticky top-0 bg-white z-50 shadow-sm">

      <div className="logo font-bold text-xl">
        <Link to="/">SHOPEASE</Link>
      </div>

      <div className="mt-2 sm:mt-0 py-2 text-xs sm:text-base w-full max-w-xl">
        <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
          <li className="flex items-center space-x-3 sm:space-x-4">
            <button className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700">
              ✓
            </button>
            <span className="font-semibold text-gray-900">Shop</span>
          </li>

          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>

          <li className="flex items-center space-x-3 sm:space-x-4">
            <button
              className={`flex h-6 w-6 font-sans items-center justify-center rounded-full text-xs font-semibold ${
                shippingSelected ? "bg-emerald-200 text-emerald-700" : "bg-gray-600 text-white"
              }`}
            >
              {shippingSelected ? "✓" : "2"}
            </button>
            <span className={`font-semibold ${shippingSelected ? "text-gray-900" : "text-gray-600"}`}>
              Shipping
            </span>
          </li>

          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>

          <li className="flex items-center space-x-3 sm:space-x-4">
            <button
              className={`flex h-6 w-6 font-sans items-center justify-center rounded-full text-xs font-semibold ${
                detailsValid ? "bg-emerald-200 text-emerald-700" : "bg-gray-600 text-white"
              }`}
            >
              {detailsValid ? "✓" : "3"}
            </button>
            <span className={`font-semibold ${detailsValid ? "text-gray-900" : "text-gray-600"}`}>
              Details
            </span>
          </li>

          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>

          <li className="flex items-center space-x-3 sm:space-x-4">
            <button className="flex h-6 w-6 font-sans items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white">
              4
            </button>
            <span className="font-semibold text-gray-500">Payment</span>
          </li>
        </ul>
      </div>
    </header>
  );
}
