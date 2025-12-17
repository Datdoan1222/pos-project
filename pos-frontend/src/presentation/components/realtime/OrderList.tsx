import { useState, useEffect } from 'react';
import { Order } from '@core/entities/Order';
import { OrderCard } from './OrderCard';

interface OrderListProps {
  orders: Order[];
}

export const OrderList = ({ orders }: OrderListProps) => {
  const [newOrderIds, setNewOrderIds] = useState<Set<string>>(new Set());

  // Track new orders for animation
  useEffect(() => {
    if (orders.length > 0) {
      const latestOrderId = orders[0].id;
      
      // Mark as new
      setNewOrderIds(prev => new Set(prev).add(latestOrderId));
      
      // Remove "new" status after 3 seconds
      const timer = setTimeout(() => {
        setNewOrderIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(latestOrderId);
          return newSet;
        });
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [orders.length]);

  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 text-6xl mb-4">📦</div>
        <p className="text-gray-500 text-lg">Chưa có đơn hàng nào</p>
        <p className="text-gray-400 text-sm mt-2">
          Đơn hàng sẽ hiển thị realtime khi có người thanh toán
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          isNew={newOrderIds.has(order.id)}
        />
      ))}
    </div>
  );
};