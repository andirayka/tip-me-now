import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DonationPage from "./pages/DonationPage";
import Streamer from "./pages/Streamer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DonationPage />,
  },
  {
    path: "/streamer",
    element: <Streamer />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
