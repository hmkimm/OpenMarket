import URL from "../URL";

const AddProductAPI = async ({ inputs }, token) => {
  try {
    const res = await fetch(`${URL}/products/`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify(inputs),
    });
    const data = await res.json();
    
  } catch (error) {
    console.error("addproduct api 오류", error);
  }
  return data;
};

export default AddProductAPI;
