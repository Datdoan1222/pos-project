import { Product } from "@core/entities/Product";
import { formatCurrency } from "@shared/utils/formatCurrency";
import { Button } from "@presentation/components/shared/Button";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      {product.image && (
        <div className="w-full h-32 bg-gray-100 rounded-md mb-3 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="flex items-center justify-between py-4">
        <h3 className="font-semibold text-gray-900 truncate max-w-[70%]">
          {product.name}
        </h3>
        <p className="text-red-600 font-bold text-sm whitespace-nowrap">
          {formatCurrency(product.price)}
        </p>
      </div>
      <div className="flex-grow" />
      <Button variant="primary" fullWidth onClick={() => onAddToCart(product)}>
        Thêm vào giỏ
      </Button>
    </div>
  );
};
