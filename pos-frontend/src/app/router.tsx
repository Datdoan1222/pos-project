import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "@shared/constants/config";
import POSScreen from "@presentation/pages/POSScreen/POSScreen";
import RealtimeScreen from "@presentation/pages/RealtimeScreen/RealtimeScreen";

export const router = createBrowserRouter([
  {
    path: ROUTES.POS,
    element: <POSScreen />,
  },
  {
    path: ROUTES.REALTIME,
    element: <RealtimeScreen />,
  },
]);
