import URL from "../URL";
import { useCallback } from "react";
import userToken from "../../Recoil/userToken/userToken";
import { useRecoilValue } from "recoil";

const ProductDetailAPI = (productId: string | number | undefined, token : string) => {
  // const token = useRecoilValue(userToken);

  const getDetail = async () => {
    try {
      const res = await fetch(`${URL}/products/${productId}`, {
        method: "GET",
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      const result = await res.json();

      return result;
    } catch (error) {
      console.error("api error", error);
      throw error;
    }
  }

  return getDetail;
};

export default ProductDetailAPI;
