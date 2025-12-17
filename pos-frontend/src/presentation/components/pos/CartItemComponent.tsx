import { CartItem as CartItemEntity } from "@core/entities/CartItem";
import { formatCurrency } from "@shared/utils/formatCurrency";

interface CartItemProps {
  item: CartItemEntity;
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onRemove: (productId: string) => void;
}

export const CartItemComponent = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{item.product.name}</h4>
        <p className="text-sm text-gray-500">
          {formatCurrency(item.product.price)} x {item.quantity}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onDecrease(item.product.id)}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="w-8 text-center font-medium">{item.quantity}</span>
          <button
            onClick={() => onIncrease(item.product.id)}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            +
          </button>
        </div>

        <div className="w-24 text-right font-semibold text-gray-900">
          {formatCurrency(item.subtotal)}
        </div>

        <button
          onClick={() => onRemove(item.product.id)}
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
