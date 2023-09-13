import React, { useState, useEffect } from "react";

import SellerProductListAPI from "../API/Product/SellerProductListAPI";
import { useRecoilValue } from "recoil";
import userToken from "../Recoil/userToken/userToken";
import BasicHeader from "../Components/Header/BasicHeader";

export default function SellerMain() {
  const token = useRecoilValue(userToken);
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProductList = async () => {
      const res = await SellerProductListAPI(token);
      // const res = await fetchProduct();

      console.log(res);
      setProduct(res);
    };
    getProductList();
    console.log(product);
  }, []);
  return (
    <div>
      <BasicHeader />
    </div>
  );
}
