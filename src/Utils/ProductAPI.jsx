import URL from "./URL";

const ProductAPI = (token) => {
  const fetchproducts = async () => {
    try {
      const res = await fetch(`${URL}/products/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("product api 오류", error);
    }
  };
  return { fetchproducts };
  //memo: 현재는 fetchProducts 함수만을 포함하고 있지만 나중에 다른 API 처리 함수를 추가할 수도 있습니다. 따라서 이 경우 객체로 반환하는 방식이 더 유연한 설계를 가능케 합니다. 객체로 반환하면 다음과 같이 여러 함수를 쉽게 추가할 수 있습니다.   
  // return { fetchProducts, createProduct, updateProduct };
};

export default ProductAPI;

//memo: 왜 ProductAPI에서는 useRecoilValue 사용할수 없는가? => 일반함수 안에서는 훅을 사용할 수 없기 때문. 따라서 BuyerMain이라는 리액트 함수 컴포넌트에서 훅(recoilValue)를 사용해야 된다.

// BuyerMain는 리액트 함수 컴포넌트입니다. 이 함수의 목적은 리액트 앱의 일부 UI를 구성하는 것이며, 실제 로직에서 리액트 요소(예: JSX)를 반환합니다. 반면, ProductAPI는 일반 함수입니다. 이 함수의 목적은 API 요청 로직을 처리하는 것이며, 객체를 반환합니다. 이 경우 반환된 객체에는 fetchproducts라는 함수가 포함됩니다. 따라서 ProductAPI는 리액트 요소를 반환하지 않고, 비동기 작업을 처리하는 함수를 반환합니다.
