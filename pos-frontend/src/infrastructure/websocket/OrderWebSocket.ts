import { API_ENDPOINTS } from "@/shared/constants/config";
import * as signalR from "@microsoft/signalr";

export const orderConnection = new signalR.HubConnectionBuilder()
  .withUrl(API_ENDPOINTS.REALTIME.REALTIME_ORDER, {
    withCredentials: true,
  })
  .withAutomaticReconnect()
  .build();
