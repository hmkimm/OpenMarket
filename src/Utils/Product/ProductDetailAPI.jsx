import URL from "../URL";
import userToken from "../../Recoil/userToken/userToken";
import { useRecoilValue } from "recoil";

const ProductDetailAPI = (productId) => {
  const token = useRecoilValue(userToken);
  
  const getDetail = async () => {
    try {
      const res = await fetch(`${URL}/products/${productId}`, {
        method: "GET",
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      const result = await res.json();
      console.log(result);

      return result;
    } catch (error) {
      console.error("api error", error);
      throw error;
    }
  };

  getDetail();

  return getDetail;
};

export default ProductDetailAPI;
