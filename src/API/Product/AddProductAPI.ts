import URL from "../URL";
import { useRecoilValue } from "recoil";
import userToken from "Recoil/userToken/userToken";
import { ProductInputs } from "Pages/AddProduct";

const AddProductAPI = (inputs: ProductInputs) => {
  const token = useRecoilValue(userToken);

  const addProduct = async () => {
    try {
      const res = await fetch(`${URL}/products/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify(inputs),
      });
      if (!res.ok) {
        throw new Error(`HTTP Error! Status: ${res.status}`);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("addproduct api 오류", error);
      throw error;
    }
  };
  return addProduct;
};

export default AddProductAPI;
