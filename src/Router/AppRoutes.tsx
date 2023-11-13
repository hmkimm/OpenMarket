import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
import SocialRedirect from "Pages/SocialRedirect";
import Loading from "Components/Loading";


const BuyerMain = lazy(() => import("../Pages/BuyerMain"));


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading/>}>
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
          <Route path="/auth" element={<SocialRedirect />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
