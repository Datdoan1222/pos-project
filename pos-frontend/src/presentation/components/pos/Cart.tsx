import { CartItem as CartItemEntity } from "@core/entities/CartItem";
import { Button } from "@presentation/components/shared/Button";
import { formatCurrency } from "@shared/utils/formatCurrency";
import { CartItemComponent } from "@presentation/components/pos/CartItemComponent";

interface CartProps {
  items: CartItemEntity[];
  total: number;
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onRemove: (productId: string) => void;
  onCheckout: () => void;
  isCheckingOut: boolean;
}

export const Cart = ({
  items,
  total,
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout,
  isCheckingOut,
}: CartProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Giỏ hàng</h2>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Giỏ hàng trống</p>
      ) : (
        <>
          <div className="space-y-2 mb-6 max-h-96 overflow-y-auto">
            {items.map((item) => (
              <CartItemComponent
                key={item.product.id}
                item={item}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                onRemove={onRemove}
              />
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4 mb-4">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Tổng cộng:</span>
              <span className="text-primary-600">{formatCurrency(total)}</span>
            </div>
          </div>

          <Button
            variant="primary"
            fullWidth
            onClick={onCheckout}
            disabled={isCheckingOut || items.length === 0}
          >
            {isCheckingOut ? "Đang xử lý..." : "Thanh toán"}
          </Button>
        </>
      )}
    </div>
  );
};
