export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8081";

export const ROUTES = {
  POS: "/",
  REALTIME: "/realtime",
} as const;

export const APP_NAME = "POS System";
export const CURRENCY = "VND";

export const API_ENDPOINTS = {
  ORDERS: {
    GET_ALL: "/api/orders",
    CREATE: "/api/orders",
  },
  PRODUCTS: {
    GET_ALL: "/api/products",
    GET_BY_ID: (id: string) => `/api/products/${id}`,
  },
  REALTIME: {
    REALTIME_ORDER: `${API_BASE_URL}/hubs/orders`,
  },
} as const;
