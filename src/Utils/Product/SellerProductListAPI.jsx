import URL from "../URL";

const SellerProductListAPI = async (token) => {
  // const fetchProduct = async () => {
  try {
    const res = await fetch(`${URL}/seller/`, {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
    const data = await res.json();
    console.log("seller product api 통신");
    return data;
  } catch (error) {
    console.error("seller api 오류", error);
    throw error;
  }
};


export default SellerProductListAPI;
