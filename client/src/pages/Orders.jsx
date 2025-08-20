import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { fetchOrders } from '../features/orders/orderService';

const statusColors = {
  pending: 'text-yellow-500',
  processing: 'text-blue-500',
  shipped: 'text-indigo-500',
  delivered: 'text-green-600',
  cancelled: 'text-red-600',
};

const Orders = () => {
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
  if (!orders.length) return <div className="p-8 text-center text-gray-600">You have no orders yet.</div>;

  return (
    <div className="max-w-full min-h-screen p-8">
      <h1 className="text-3xl font-semibold mb-6">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="border rounded-lg shadow p-6 bg-white">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">
                Order ID: <code className="text-sm">{order._id}</code>
              </span>
              <span className={`font-semibold ${statusColors[order.status] || 'text-gray-600'}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            <div className="text-sm text-gray-500 mb-4">
              Placed on: {format(new Date(order.createdAt), 'PPpp')}
            </div>
            <div>
              <h3 className="font-semibold mb-2">Items:</h3>
              <ul className="space-y-2">
                {order.orderItems.map(({ product, quantity, price }) => (
                  <li key={product._id} className="flex items-center space-x-4">
                    <img
                      src={product.images?.[0] || ''}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-600">Qty: {quantity}</div>
                    </div>
                    <div className="font-semibold">₹{(price * quantity).toLocaleString()}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 text-right font-bold text-lg">
              Total: ₹{order.totalPrice.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
