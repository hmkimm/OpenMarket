import URL from "../URL";
import { useRecoilValue } from "recoil";
import userToken from "Recoil/userToken/userToken";
import { ProductInputs } from "Pages/AddProduct";

const AddProductAPI = async ( inputs: ProductInputs ) => {
  const token = useRecoilValue(userToken);

  try {
    const res = await fetch(`${URL}/products/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify(inputs),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("addproduct api 오류", error);
    return {};
  }
};

export default AddProductAPI;
