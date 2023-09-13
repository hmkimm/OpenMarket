import URL from "../URL";

const AddProductAPI = async ({ inputs, token }) => {
  try {
    const res = await fetch(`${URL}/products/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `JWT ${token}`,
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
