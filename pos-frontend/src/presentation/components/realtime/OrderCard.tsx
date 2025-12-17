import { Order } from "@core/entities/Order";
import { formatCurrency } from "@shared/utils/formatCurrency";
import { formatDate, getRelativeTime } from "@shared/utils/formatDate";

interface OrderCardProps {
  order: Order;
  isNew?: boolean;
}

export const OrderCard = ({ order, isNew = false }: OrderCardProps) => {
  return (
    <div
      className={`
        bg-white rounded-lg shadow-sm border-2 p-6 
        transition-all duration-500
        ${isNew ? "border-green-500 animate-pulse" : "border-gray-200"}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{order.id}</h3>
          <p className="text-sm text-gray-500">
            {getRelativeTime(order.createdAt)}
          </p>
        </div>

        {isNew && (
          <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            MỚI
          </span>
        )}
      </div>

      {/* Items */}
      <div className="mb-4 space-y-2">
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="text-gray-600">
              {item.productName} x {item.quantity}
            </span>
            <span className="text-gray-900 font-medium">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 pt-4 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">Tổng cộng:</span>
          <span className="text-xl font-bold text-primary-600">
            {formatCurrency(order.total)}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-xs text-gray-500 text-right">
        {formatDate(order.createdAt)}
      </div>
    </div>
  );
};
