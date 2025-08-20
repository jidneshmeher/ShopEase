import React from 'react';

export default function PaymentWithCard({ visible, onClose, onSuccess }) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Card Payment</h2>
        <p>Card payment form placeholder</p>
        <button
          onClick={onSuccess}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
