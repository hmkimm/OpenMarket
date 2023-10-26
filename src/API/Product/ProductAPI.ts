import URL from "../URL";
import userToken from "Recoil/userToken/userToken";
import { useRecoilValue } from "recoil";
import { useCallback } from "react";

const ProductAPI = () => {
  const token = useRecoilValue(userToken);

  const fetchproducts = useCallback(async () => {
    let authorizationToken;

    if (localStorage.getItem("kakaoToken")) {
      authorizationToken = `Bearer ${localStorage.getItem("kakaoToken")}`;
    } else {
      authorizationToken = `JWT ${token}`;
    }
    console.log(authorizationToken);

    try {
      const res = await fetch(`${URL}/products/`, {
        method: "GET",
        headers: {
          // Authorization: `JWT ${token}`,
          Authorization: authorizationToken,
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("product api 오류", error);
    }
  }, [token]);

  return { fetchproducts };
};

export default ProductAPI;
