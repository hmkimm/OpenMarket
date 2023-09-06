import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import BuyerMain from "../Pages/BuyerMain";
import SellerMain from "../Pages/SellerMain";
import AddProduct from "../Pages/AddProduct";
import ProductDetail from "../Pages/ProductDetail";
import LogIn from "../Pages/LogIn";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/buyermain" element={<BuyerMain />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/sellermain" element={<SellerMain />} />
        <Route path="/addproduct" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;