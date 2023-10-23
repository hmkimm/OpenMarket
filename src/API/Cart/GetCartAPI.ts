import URL from "../URL";
import { useRecoilValue } from "recoil";
import userToken from "../../Recoil/userToken/userToken";
import { useCallback } from "react";
import { CartItemsType } from "Pages/ShoppingCart";

const GetCartAPI = (): (() => Promise<CartItemsType>) => {
  const token = useRecoilValue(userToken);
  const fetchCartItem = useCallback(async (): Promise<CartItemsType> => {
    try {
      const res = await fetch(`${URL}/cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
      });

      const result : CartItemsType= await res.json();
      return result;
    } catch (error) {
      console.error("api error", error);
      throw error;
    }
  }, [token]);

  return fetchCartItem;
};

export default GetCartAPI;
