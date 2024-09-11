import { createBrowserRouter, Outlet } from "react-router-dom";
import { StartSetupPage } from "./pages/StartSetup";
import { SetupStatusPage } from "./pages/SetupStatus";
import Setup from "./pages/Setup";
import { WelcomePage } from "./pages/WelcomePage";
import { SetupCompletePage } from "./pages/SetupComplete";
import { CustomerDetailsPage } from "./pages/CustomerDetails";
import { HomePage } from "./pages/Home";

export const AppRoutes = () => {
  return createBrowserRouter([
    {
      element: <Outlet />,
      children: [
        {
          path: "/",
          element: <WelcomePage/>,
        },
        {
          path: "/welcome",
          element: <WelcomePage />,
        },
        {
          path: "/customer-details",
          element: <CustomerDetailsPage />,
        },
        {
          path: "/setup-start",
          element: <StartSetupPage/>,
        },
        {
          path: "/setup",
          element: <Setup/>,
        },
        {
          path: "/setup-status",
          element: <SetupStatusPage />,
        },
        {
          path: "/setup-complete",
          element: <SetupCompletePage />,
        },
        {
          path: "/home",
          element: <HomePage />,
        },
        {
          path: "*",
          element: <div>Page not found</div>,
        },
      ],
    },
  ]);
};
