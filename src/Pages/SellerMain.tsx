import { useState, useEffect } from "react";

import SellerProductListAPI from "../API/Product/SellerProductListAPI";
import SellerHeader from "Components/Header/SellerHeader";

const SellerMain = () => {
  const [product, setProduct] = useState({});
  const fetchProduct = SellerProductListAPI();
  useEffect(() => {
    const getProductList = async () => {
      const res = await fetchProduct();
      console.log(res);
      setProduct(res);
    };
    getProductList();
    console.log(product);
  }, []);
  return (
    <div>
      <SellerHeader />
    </div>
  );
};

export default SellerMain;
