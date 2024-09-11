import { createBrowserRouter, Outlet } from "react-router-dom";
import { StartSetupPage } from "./pages/StartSetup";
import Setup from "./pages/Setup";
export const AppRoutes = () => {
  return createBrowserRouter([
    {
      element: <Outlet />,
      children: [
        {
          path: "/",
          element: <Setup/>,
        },
        {
          path: "/welcome",
          element: <div>Welcome</div>,
        },
        {
          path: "/customer-details",
          element: <div>Customer Details</div>,
        },
        {
          path: "/setup-start",
          element: <StartSetupPage/>,
        },
        {
          path: "/setup",
          element: <div>Setup</div>,
        },
        {
          path: "/setup-complete",
          element: <div>Setup Complete</div>,
        },
        {
          path: "/home",
          element: <div>home</div>,
        },
        {
          path: "*",
          element: <div>Page not found</div>,
        },
      ],
    },
  ]);
};
