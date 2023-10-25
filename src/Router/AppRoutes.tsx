import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import BuyerMain from "../Pages/BuyerMain";
import SellerMain from "../Pages/SellerMain";
import AddProduct from "../Pages/AddProduct";
import ProductDetail from "../Pages/ProductDetail";
import LogIn from "../Pages/LogIn";
import ShoppingCart from "../Pages/ShoppingCart";
import SellerCenter from "Pages/SellerCenter";
import ProtectedRoute from "./ProtectedRoute";
import Order from "Pages/Order";
import BuyerJoin from "Pages/BuyerJoin";
import NotFound from "Pages/NotFound";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/buyerjoin" element={<BuyerJoin />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/buyermain" element={<BuyerMain />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/order" element={<Order />} />
        </Route>

        <Route path="/sellermain" element={<SellerMain />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/sellercenter" element={<SellerCenter />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
