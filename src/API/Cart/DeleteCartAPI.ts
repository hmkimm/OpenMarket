import URL from "../URL";
import { useRecoilValue } from "recoil";
import userToken from "../../Recoil/userToken/userToken";

const DeleteCartAPI = (): ((cartId: number) => Promise<void>) => {
  const token = useRecoilValue(userToken);

  const delCartItem = async (cartId: number) => {
    let authorizationToken;

    if (localStorage.getItem("kakaoToken")) {
      authorizationToken = `Bearer ${localStorage.getItem("kakaoToken")}`;
    } else {
      authorizationToken = `JWT ${token}`;
    }
console.log('사용되는 토큰 : ', authorizationToken)
    try {
      await fetch(`${URL}/cart/${cartId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
          // Authorization: `JWT ${token}`,
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
