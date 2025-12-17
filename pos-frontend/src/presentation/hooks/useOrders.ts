import { useState, useEffect } from "react";
import { Order } from "@core/entities/Order";
import { OrderApiRepository } from "@infrastructure/api/OrderApiRepository";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const repository = new OrderApiRepository();

        const data = await repository.getAll();
        setOrders(data);
        setError(null);
      } catch (err) {
        setError("Failed to load orders");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Listen for realtime updates
  useEffect(() => {
    const handleNewOrder = (event: CustomEvent) => {
      const newOrder = event.detail as Order;
      console.log("New order received:", newOrder);

      // Add new order to the top of the list
      setOrders((prevOrders) => [newOrder, ...prevOrders]);
    };

    // Listen to custom event from MockOrderRepository
    window.addEventListener("order-created", handleNewOrder as EventListener);

    return () => {
      window.removeEventListener(
        "order-created",
        handleNewOrder as EventListener
      );
    };
  }, []);
  const addOrder = (newOrder: Order) => {
    setOrders((prev) => {
      if (prev.some((o) => o.id === newOrder.id)) return prev;
      return [newOrder, ...prev];
    });
  };
  return { orders, loading, error, addOrder };
};
