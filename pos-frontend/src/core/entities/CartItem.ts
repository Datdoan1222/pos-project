import { Product } from "./Product";

export class CartItem {
  constructor(
    public readonly product: Product,
    public readonly quantity: number
  ) {}

  get subtotal(): number {
    return this.product.price * this.quantity;
  }

  increaseQuantity(): CartItem {
    return new CartItem(this.product, this.quantity + 1);
  }

  decreaseQuantity(): CartItem {
    if (this.quantity <= 1) {
      return this;
    }
    return new CartItem(this.product, this.quantity - 1);
  }
}
