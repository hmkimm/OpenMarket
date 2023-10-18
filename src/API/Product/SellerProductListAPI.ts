import { useCallback } from "react";
import URL from "../URL";
import { useRecoilValue } from "recoil";
import userToken from "Recoil/userToken/userToken";

const SellerProductListAPI = () => {
  const token = useRecoilValue(userToken);

  const fetchProduct = useCallback(async () => {
    try {
      const res = await fetch(`${URL}/seller/`, {
        method: "GET",
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      const data = await res.json();
      console.log("seller product api 통신");
      return data;
    } catch (error) {
      console.error("seller api 오류", error);
      throw error;
    }
  }, [token]);

  return fetchProduct;
};

export default SellerProductListAPI;
