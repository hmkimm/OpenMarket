import URL from "../URL";
import { useRecoilValue } from "recoil";
import userToken from "../../Recoil/userToken/userToken";

const DeleteAllCartsAPI = (): (() => Promise<void>) => {
  const token = useRecoilValue(userToken);

  const handleDeleteAllCart = async () => {


    try {
      await fetch(`${URL}/cart`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
      });
    } catch (error) {
      console.error("api error", error);
      throw error;
    }
  };
  return handleDeleteAllCart;
};

export default DeleteAllCartsAPI;
