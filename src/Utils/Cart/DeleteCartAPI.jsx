import URL from "../URL";
import { useRecoilValue } from "recoil";
import userToken from "../../Recoil/userToken/userToken";

const DeleteCartAPI = () => {
  const token = useRecoilValue(userToken);

  const delCartItem = async (cartId) => {
    try {
      await fetch(`${URL}/cart/${cartId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
      });
    } catch (error) {
      console.log("api error", error);
      throw error;
    }
  };
  return delCartItem;
};

export default DeleteCartAPI;
