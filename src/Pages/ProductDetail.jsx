import React, { useEffect, useState } from "react";
import ProductDetailAPI from "../Utils/Product/ProductDetailAPI";

const ProductDetail = () => {
  const [productDetail, setProductDetail] = useState([]);
  const getDetail = ProductDetailAPI(productId);

  useEffect(() => {}, []);
  return <div>ProductDetail</div>;
};

export default ProductDetail;
