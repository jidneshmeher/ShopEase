import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-900 py-16 px-6 w-full border-t border-gray-200">
      <div className="max-w-full px-10 flex flex-col sm:flex-row sm:justify-between sm:gap-0">

        {/* Logo & Description */}
        <div className="flex flex-col max-w-xs space-y-4">
          <div className="flex items-center space-x-3">
            <span className="font-semibold text-gray-900 text-lg select-none">ShopEase</span>
          </div>
          <p className="text-gray-800 italic text-sm pr-10 max-w-[300px] select-none">
            All credits own by respective owner.
          </p>
        </div>

        {/* Footer Links */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-12 sm:gap-20 mt-8 sm:mt-0">
          {/* Pages */}
          <div className="flex flex-col space-y-3 min-w-[100px]">
            <h3 className="font-semibold text-gray-900 text-base select-none">Pages</h3>
            <a href="#" className="text-gray-800 text-sm hover:text-blue-600 hover:underline transition select-none">Home</a>
            <a href="#" className="text-gray-800 text-sm hover:text-blue-600 hover:underline transition select-none">Products</a>
            <a href="#" className="text-gray-800 text-sm hover:text-blue-600 hover:underline transition select-none">About Us</a>
          </div>

          {/* Features */}
          <div className="flex flex-col space-y-3 min-w-[100px]">
            <h3 className="font-semibold text-gray-900 text-base select-none">Features</h3>
            <a href="#" className="text-gray-800 text-sm hover:text-blue-600 hover:underline transition select-none">We’re Hiring</a>
            <a href="#" className="text-gray-800 text-sm hover:text-blue-600 hover:underline transition select-none">Help</a>
          </div>

          {/* Cookies */}
          <div className="flex flex-col space-y-3 min-w-[100px]">
            <h3 className="font-semibold text-gray-900 text-base select-none">Cookies</h3>
            <a href="#" className="text-gray-800 text-sm hover:text-blue-600 hover:underline transition select-none">Data Collect</a>
            <a href="#" className="text-gray-800 text-sm hover:text-blue-600 hover:underline transition select-none">Terms</a>
            <a href="#" className="text-gray-800 text-sm hover:text-blue-600 hover:underline transition select-none">Privacy</a>
            <a href="#" className="text-gray-800 text-sm hover:text-blue-600 hover:underline transition select-none">Laws</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
