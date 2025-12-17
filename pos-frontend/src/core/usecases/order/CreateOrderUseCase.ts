import { Order } from "@core/entities/Order";
import { CartItem } from "@core/entities/CartItem";
import {
  IOrderRepository,
  CreateOrderDTO,
} from "@core/repositories/IOrderRepository";

export class CreateOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(cartItems: CartItem[]): Promise<Order> {
    if (cartItems.length === 0) {
      throw new Error("Cart is empty");
    }

    const orderDTO: CreateOrderDTO = {
      items: cartItems.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
      total: cartItems.reduce((sum, item) => sum + item.subtotal, 0),
    };

    return await this.orderRepository.create(orderDTO);
  }
}
