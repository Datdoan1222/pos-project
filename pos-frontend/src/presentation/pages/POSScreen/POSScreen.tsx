import { Link } from "react-router-dom";
import { ROUTES } from "@shared/constants/config";
import { usePOS } from "./usePOS";
import { ProductList } from "@presentation/components/pos/ProductList";
import { Cart } from "@presentation/components/pos/Cart";
import { Loading } from "@presentation/components/shared/Loading";

const POSScreen = () => {
  const {
    products,
    loadingProducts,
    productsError,
    cart,
    isCheckingOut,
    checkoutSuccess,
    checkoutError,
    handleCheckout,
  } = usePOS();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Toast */}
      {checkoutSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          ✓ Thanh toán thành công!
        </div>
      )}
      {checkoutError && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          Thanh toán thất bại. Vui lòng thử lại!
        </div>
      )}

      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">POS System</h1>
          <Link
            to={ROUTES.REALTIME}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Xem đơn hàng realtime
          </Link>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Products Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sản phẩm</h2>

            {loadingProducts && <Loading />}

            {productsError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {productsError}
              </div>
            )}

            {!loadingProducts && !productsError && (
              <ProductList products={products} onAddToCart={cart.addToCart} />
            )}
          </div>

          {/* Cart Section */}
          <div className="lg:col-span-1">
            <Cart
              items={cart.cartItems}
              total={cart.total}
              onIncrease={cart.increaseQuantity}
              onDecrease={cart.decreaseQuantity}
              onRemove={cart.removeFromCart}
              onCheckout={handleCheckout}
              isCheckingOut={isCheckingOut}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default POSScreen;
