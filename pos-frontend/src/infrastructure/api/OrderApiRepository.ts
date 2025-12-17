import {
  IOrderRepository,
  CreateOrderDTO,
} from "@core/repositories/IOrderRepository";
import { Order } from "@core/entities/Order";
import { apiClient } from "./axiosConfig";
import { API_ENDPOINTS } from "@/shared/constants/config";

export class OrderApiRepository implements IOrderRepository {
  async create(orderDTO: CreateOrderDTO): Promise<Order> {
    const response = await apiClient.post(
      API_ENDPOINTS.ORDERS.CREATE,
      orderDTO
    );
    return Order.fromJSON(response.data);
  }

  async getAll(): Promise<Order[]> {
    const response = await apiClient.get(API_ENDPOINTS.ORDERS.GET_ALL);
    return response.data.map((item: any) => Order.fromJSON(item));
  }
}
