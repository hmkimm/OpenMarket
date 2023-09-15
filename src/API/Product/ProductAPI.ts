import URL from "../URL";
import userToken from "Recoil/userToken/userToken";
import { useRecoilValue } from "recoil";

const ProductAPI = () => {
  const token = useRecoilValue(userToken);

  const fetchproducts = async () => {
    try {
      const res = await fetch(`${URL}/products/`, {
        method: "GET",
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("product api 오류", error);
    }
  };
  return { fetchproducts };
};

export default ProductAPI;
