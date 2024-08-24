import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import TP2_6 from "./TPs/TP 2.6";
import ProductInfo from "./TPs/TP 2.16/pages/product";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import TP2_7 from "./TPs/TP 2.7";
import AddProduct from "./TPs/TP 2.16/pages/add_product";
import TP2_8 from "./TPs/TP 2.8";
import TP2_9 from "./TPs/TP 2.9";
import TP2_10 from "./TPs/TP 2.10";
import Login from "./TPs/TP 2.16/pages/login";
import TP2_11 from "./TPs/TP 2.11/pages";
import TP2_13 from "./TPs/TP 2.13/pages";
import TP2_14 from "./TPs/TP 2.14/pages";
import TP2_15 from "./TPs/TP 2.15/pages";
import Favorites from "./TPs/TP 2.16/pages/favorites";
import TP2_16 from "./TPs/TP 2.16/pages";

const isAuthenticated = () => {
  console.log(localStorage.getItem("@authToken"));
  return localStorage.getItem("@authToken");
};

const router = createBrowserRouter([
  {
    path: "/",
    element: isAuthenticated() ? <TP2_16 /> : <Navigate to="/login" />,
  },
  {
    path: "product/info/:product_id",
    element: isAuthenticated() ? <ProductInfo /> : <Navigate to="/login" />,
  },
  {
    path: "product/add",
    element: isAuthenticated() ? <AddProduct /> : <Navigate to="/login" />,
  },
  {
    path: "product/favorites",
    element: <Favorites />,
  },
  {
    path: "login",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
