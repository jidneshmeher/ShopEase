import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { fetchOrders } from '../features/orders/orderService';
import OrderNow from "../assets/images/order-now.png"
import {Link} from "react-router-dom"

const statusColors = {
  pending: 'text-yellow-500',
  processing: 'text-blue-500',
  shipped: 'text-indigo-500',
  delivered: 'text-green-600',
  cancelled: 'text-red-600',
};

export default function Orders(){
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-600">Loading your orders...</div>;
  if (error) return <div className="p-8 text-center text-red-600">Error: {error}</div>;
  if (!orders.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
        <img
          src={OrderNow}
          alt="Order Now"
          className="w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain"
        />
        <p className="text-center text-gray-600 text-lg md:text-xl">
          You have no orders yet.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-full min-h-screen p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6 text-center sm:text-left px-8">
        My Orders
      </h1>
      <div className="space-y-6 sm:px-8">
        {orders.map((order) => (
          <div 
            key={order._id} 
            className="border rounded-lg shadow p-4 sm:p-6"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-1 sm:gap-0">
              <span className="font-medium text-sm sm:text-base break-all">
                Order ID: <code className="text-xs sm:text-sm">{order._id}</code>
              </span>
              <span className={`font-semibold text-sm sm:text-base ${statusColors[order.status] || 'text-gray-600'}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
        
            <div className="text-xs sm:text-sm text-gray-500 mb-4">
              Placed on: {format(new Date(order.createdAt), 'PPpp')}
            </div>
        
            <div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Items:</h3>
              <ul className="space-y-3">
                {order.orderItems.map(({ product, quantity, price }) => (
                  <li 
                  key={product._id} 
                  className="flex flex-col sm:flex-row sm:items-center border-b pb-3 last:border-none"
                >
                  <Link 
                    to={`/products/${product._id}`} 
                    className="flex items-center space-x-4 flex-1 group"
                  >
                    <img
                      src={product.images?.[0] || ''}
                      alt={product.name}
                      className="w-20 h-20 sm:w-16 sm:h-16 object-cover rounded mb-2 sm:mb-0"
                    />
                    <div>
                      <div className="font-medium text-sm sm:text-base group-hover:underline">
                        {product.name}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">Qty: {quantity}</div>
                    </div>
                  </Link>
                
                  <div className="font-semibold text-sm sm:text-base mt-1 sm:mt-0 text-right sm:text-left">
                    ₹{(price * quantity).toLocaleString()}
                  </div>
                </li>                
                ))}
              </ul>
            </div>
                
            <div className="mt-4 text-right font-bold text-base sm:text-lg">
              Total: ₹{order.totalPrice.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
