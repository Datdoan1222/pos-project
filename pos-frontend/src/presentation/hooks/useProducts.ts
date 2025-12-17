import { useState, useEffect } from "react";
import { Product } from "@core/entities/Product";
import { GetProductsUseCase } from "@core/usecases/product/GetProductsUseCase";
import { ProductApiRepository } from "@infrastructure/api/ProductApiRepository";
// import { MockProductRepository } from '@/infrastructure/api/MockProductRepository';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // const repository = new MockProductRepository();
        const repository = new ProductApiRepository();
        const useCase = new GetProductsUseCase(repository);
        const data = await useCase.execute();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};
