import { Order } from "@/core/entities/Order";
import { orderConnection } from "@/infrastructure/websocket/OrderWebSocket";
import { HubConnectionState } from "@microsoft/signalr";
import { useOrders } from "@presentation/hooks/useOrders";
import { useEffect, useState } from "react";

export const useRealtime = () => {
  const { orders, loading, error, addOrder } = useOrders();

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const statusConfig = {
    connected: {
      text: "Đang hoạt động",
      textColor: "text-green-600",
      dotColor: "bg-green-500",
      bgIcon: "bg-green-100",
      iconColor: "text-green-600",
    },
    disconnected: {
      text: "Ngắt kết nối",
      textColor: "text-red-600",
      dotColor: "bg-red-500",
      bgIcon: "bg-red-100",
      iconColor: "text-red-600",
    },
  };
  const [statusRealTime, setStatusRealTime] = useState(
    statusConfig.disconnected
  );

  useEffect(() => {
    let isMounted = true;

    const startConnection = async () => {
      if (orderConnection.state !== HubConnectionState.Disconnected) return;

      try {
        await orderConnection.start();
        if (!isMounted) {
          setStatusRealTime(statusConfig.connected);
          return;
        }

        console.log("SignalR connected");
        setStatusRealTime(statusConfig.connected);
      } catch (err) {
        console.error("SignalR start failed", err);
        setStatusRealTime(statusConfig.disconnected);
      }
    };

    // Register event BEFORE start
    orderConnection.off("OrderCreated");
    orderConnection.on("OrderCreated", (order: Order) => {
      console.log("OrderCreated event received:", order);
      setStatusRealTime(statusConfig.connected);
      addOrder(Order.fromJSON(order));
    });

    orderConnection.onclose(() => {
      console.log("SignalR disconnected");
      setStatusRealTime(statusConfig.disconnected);
    });

    orderConnection.onreconnected(() => {
      console.log("SignalR reconnected");
      setStatusRealTime(statusConfig.connected);
    });

    startConnection();

    return () => {
      isMounted = false;
      orderConnection.off("OrderCreated");
    };
  }, []);

  return {
    statusRealTime,
    orders,
    loading,
    error,
    totalOrders,
    totalRevenue,
  };
};
