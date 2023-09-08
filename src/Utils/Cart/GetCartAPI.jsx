import React from "react";
import URL from "../URL";
import { useRecoilValue } from "recoil";
import userToken from "../../Recoil/userToken/userToken";

const GetCartAPI = () => {
  const token = useRecoilValue(userToken);
  const fetchCartItem = async () => {
    try {
      const res = await fetch(`${URL}/cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
      });

      const result = await res.json();
      return result;
    } catch (error) {
      console.error("api error", error);
      throw error;
    }
  };
  return fetchCartItem;
};

export default GetCartAPI;
