import { IProductRepository } from "@core/repositories/IProductRepository";
import { Product } from "@core/entities/Product";
import { apiClient } from "./axiosConfig";
import { API_ENDPOINTS } from "@/shared/constants/config";

export class ProductApiRepository implements IProductRepository {
  async getAll(): Promise<Product[]> {
    const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.GET_ALL);
    return response.data.map((item: any) => Product.fromJSON(item));
  }

  async getById(id: string): Promise<Product | null> {
    try {
      const response = await apiClient.get( API_ENDPOINTS.PRODUCTS.GET_BY_ID(id));
      return Product.fromJSON(response.data);
    } catch (error) {
      return null;
    }
  }
}
