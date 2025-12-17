import { CartItem } from "./CartItem";

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
}

export class Order {
  constructor(
    public readonly id: string,
    public readonly items: OrderItem[],
    public readonly total: number,
    public readonly createdAt: Date
  ) {}

  static fromCartItems(id: string, cartItems: CartItem[]): Order {
    const items: OrderItem[] = cartItems.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
    }));

    const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

    return new Order(id, items, total, new Date());
  }

  static fromJSON(json: any): Order {
    return new Order(json.id, json.items, json.total, json.createdAt);
  }
}
