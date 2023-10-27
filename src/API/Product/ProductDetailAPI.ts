import URL from "../URL";

const ProductDetailAPI = (productId: string | number | undefined, token : string) => {

  const getDetail = async () => {

    
    try {
      const res = await fetch(`${URL}/products/${productId}`, {
        method: "GET",
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      const result = await res.json();

      return result;
    } catch (error) {
      console.error("api error", error);
      throw error;
    }
  }

  return getDetail;
};

export default ProductDetailAPI;
