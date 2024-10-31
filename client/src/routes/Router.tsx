import { RouteObject } from "react-router-dom";
import HomePage from "../components/pages/HomePage";
import CartPage from "../components/pages/cartPage";
const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
];

export default routes;
