import { Order } from "@core/entities/Order";

export interface CreateOrderDTO {
  items: Array<{
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }>;
  total: number;
}

export interface IOrderRepository {
  create(order: CreateOrderDTO): Promise<Order>;
  getAll(): Promise<Order[]>;
}
