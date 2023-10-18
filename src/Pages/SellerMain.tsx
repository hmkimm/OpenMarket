import { useState, useEffect } from "react";

import SellerProductListAPI from "../API/Product/SellerProductListAPI";
import SellerHeader from "Components/Header/SellerHeader";

const SellerMain = () => {
  const [, setProduct] = useState({});
  const fetchProduct = SellerProductListAPI();
  useEffect(() => {
    const getProductList = async () => {
      const res = await fetchProduct();
      console.log(res);
      setProduct(res);
    };
    getProductList();
  }, [fetchProduct]);
  return (
    <div>
      <SellerHeader />
    </div>
  );
};

export default SellerMain;
