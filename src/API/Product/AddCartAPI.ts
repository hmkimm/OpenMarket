import URL from "../URL";
import userToken from "../../Recoil/userToken/userToken";
import { useRecoilValue } from "recoil";
import { ResponseType } from "Pages/ProductDetail";
import { CartInfoType } from "Pages/ProductDetail";

const AddCartAPI = (cartInfo: CartInfoType): (() => Promise<ResponseType>) => {
  const token = useRecoilValue(userToken);
  const addCart = async (): Promise<ResponseType> => {
    try {
      const res = await fetch(`${URL}/cart/`, {
        method: "POST",
        headers: {
          Authorization: `JWT ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartInfo),
      });

      const result = await res.json();
      return result;
    } catch (error) {
      console.error("api error", error);
      throw new Error();
    }
  };
  return addCart;
};

export default AddCartAPI;
