import { useState } from "react";
import { useProducts } from "@presentation/hooks/useProducts";
import { useCart } from "@presentation/hooks/useCart";
import { CreateOrderUseCase } from "@core/usecases/order/CreateOrderUseCase";
import { OrderApiRepository } from "@infrastructure/api/OrderApiRepository";

export const usePOS = () => {
  const {
    products,
    loading: loadingProducts,
    error: productsError,
  } = useProducts();
  const cart = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [checkoutError, setCheckoutError] = useState(false);

  const handleCheckout = async () => {
    if (cart.cartItems.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }

    try {
      setIsCheckingOut(true);

      // Create order use case
      const repository = new OrderApiRepository();
      const useCase = new CreateOrderUseCase(repository);

      // Execute checkout
      const order = await useCase.execute(cart.cartItems);

      // console.log("Order created:", order);

      // Show success message
      setCheckoutSuccess(true);

      // Clear cart
      cart.clearCart();

      // Hide success message after 3 seconds
      setTimeout(() => {
        setCheckoutSuccess(false);
        setCheckoutError(false);
      }, 3000);
    } catch (error: any) {
      console.error("Checkout failed:", error);
      setCheckoutError(true);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return {
    // Products
    products,
    loadingProducts,
    productsError,

    // Cart
    cart,

    // Checkout
    isCheckingOut,
    checkoutSuccess,
    checkoutError,
    handleCheckout,
  };
};
