import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DonationPage from "./pages/DonationPage";
import Streamer from "./pages/Streamer";
import StreamerPanel from "./pages/StreamerPanel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DonationPage />,
  },
  {
    path: "/streamer",
    element: <Streamer />,
  },
  {
    path: "/panel",
    element: <StreamerPanel />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
