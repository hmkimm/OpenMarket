// useProductDetails.js
import { useQuery } from 'react-query';
import ProductDetailAPI from 'API/Product/ProductDetailAPI';

export const useProductDetails = (product_id : number, token: string) => {
  const getDetail = ProductDetailAPI(product_id, token);
  const queryKey = ["productDetail", product_id];

  const { data: productDetail } = useQuery(queryKey, getDetail, {
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return productDetail;
};
