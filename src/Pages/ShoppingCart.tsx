import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { useRecoilState } from "recoil";
import cartProducts from "../Recoil/cart/cartProducts";
import DeleteCartAPI from "../API/Cart/DeleteCartAPI";
import GetCartAPI from "../API/Cart/GetCartAPI";

import BasicHeader from "../Components/Header/BasicHeader";
import { Layout } from "../Style/Layout";
import Button from "../Components/Common/Button";
import del from "../Assets/Icons/icon-delete.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DeleteAllCartsAPI from "../API/Cart/DeleteAllCartsAPI";
import FlexLayout from "../Style/FlexLayout";
import { CartItemType } from "\btypes";

interface QuantityButton {
  $borRadius: string;
}
interface CartPrice {
  $mb?: string;
}

const ShoppingCart = () => {
  const fetchCartItem = GetCartAPI();
  const [savedCart, setSavedCart] =
    useRecoilState<CartItemType[]>(cartProducts);

  //api에 저장
  const [cartItems, setCartItems] = useState<{}>([]);
  const delCartItem = DeleteCartAPI();
  const handleDeleteAllCart = DeleteAllCartsAPI();

  const handleDeleteAllCartItems = async () => {
    await handleDeleteAllCart();
    setSavedCart([]);
  };

  const handleDeleteCart = async (cartId: number) => {
    await delCartItem(cartId);
    const existingItemIndex = savedCart.findIndex((el) => el.cartId === cartId);
    const deletedCart = [...savedCart];
    deletedCart.splice(existingItemIndex, 1);
    setSavedCart([...deletedCart]);

    console.log(deletedCart, "삭제된 카트");
  };

  console.log("리코일 장바구니 템 상세🏌🏻‍♀️ : ", savedCart);

  useEffect(() => {
    const getCartItem = async () => {
      const data = await fetchCartItem();
      setCartItems(data);
      console.log("rendering test");
    };
    getCartItem();
  }, [fetchCartItem, savedCart]);

  //장바구니 get api, 삭제해도 바로 업뎃 안됨.
  console.log("get api에 저장된 카트템 : ", cartItems);

  return (
    <>
      <BasicHeader />
      <Layout>
        <Header>장바구니</Header>
        <CartHeader>
          <SelectButtonIndicator />
          <div>상품정보</div>
          <div>수량</div>
          <div>상품금액</div>
        </CartHeader>
        <FlexLayout $jc="flex-start">
          <Button
            onClick={handleDeleteAllCartItems}
            width="110px"
            $padding="10px"
            $margin=" 10px 15px 10px 0 "
          >
            모두 삭제
          </Button>
          <div>
            총{" "}
            <strong style={{ color: "var(--primary" }}>
              {savedCart.length}
            </strong>
            개
          </div>
        </FlexLayout>
        {savedCart &&
          savedCart?.map((el, i) => {
            console.log(el.cartId);
            return (
              <CartItem key={i}>
                <CartImg src={el.img} />
                <div>
                  <CartProvider>{el.provider}</CartProvider>
                  <CartName>{el.name}</CartName>
                  <CartPrice>{el.price?.toLocaleString()}원</CartPrice>
                  <CartShipping>
                    {el?.shippingMethod === "PARCEL" ? "택배배송" : "화물배달"}
                    &nbsp; /&nbsp;
                    {el?.shippingFee !== 0
                      ? `${el?.shippingFee}원`
                      : "무료배송"}
                  </CartShipping>
                </div>
                <QuantityLayout>
                  <QuantityButton $borRadius="8px 0 0 8px">
                    {" "}
                    <FontAwesomeIcon icon={faMinus} />
                  </QuantityButton>
                  <QuantityDisplay>{el.quantity}</QuantityDisplay>
                  <QuantityButton $borRadius=" 0 8px 8px 0 ">
                    <FontAwesomeIcon icon={faPlus} />
                  </QuantityButton>
                </QuantityLayout>
                <div
                  style={{
                    position: "absolute",
                    right: "100px",
                    textAlign: "center",
                  }}
                >
                  <CartPrice color="red" $mb="26px">
                    {(el.price * el.quantity + el.shippingFee).toLocaleString()}
                    원
                  </CartPrice>
                  <Button $padding="10px" width="130px">
                    주문하기
                  </Button>
                </div>
                <DeleteButton
                  onClick={() => {
                    handleDeleteCart(el?.cartId!);
                  }}
                />
              </CartItem>
            );
          })}
      </Layout>
    </>
  );
};

const Header = styled.h1`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 52px;
  text-align: center;
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 18px;
  margin-bottom: 35px;
  background-color: var(--light-gray);
  border-radius: 10px;
  box-sizing: border-box;
  align-items: center;
`;

const SelectButtonIndicator = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid var(--primary);
`;

const SelectButton = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid var(--primary);
`;

const CartItem = styled.section`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  height: 200px;
  border: 2px solid var(--light-gray);
  padding: 0 100px 0 30px;
  margin-bottom: 10px;
  border-radius: 10px;
  box-sizing: border-box;
`;

const CartImg = styled.img`
  width: 160px;
  height: 160px;
  margin-right: 36px;
  border-radius: 10px;
`;

const CartProvider = styled.div`
  color: var(--gray);
  margin-bottom: 10px;
`;

const CartName = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
`;

const CartPrice = styled.div<CartPrice>`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: ${(props) => props.$mb || "40px"};
  color: ${(props) => props.color};
`;

const CartShipping = styled.div`
  color: var(--gray);
`;

const DeleteButton = styled.button`
  display: block;
  width: 22px;
  height: 22px;
  position: absolute;
  top: 18px;
  right: 18px;
  background: url(${del}) no-repeat center;
`;

const QuantityLayout = styled.div`
  position: absolute;
  display: flex;
  right: 378px;
`;
const QuantityButton = styled.button<QuantityButton>`
  width: 50px;
  height: 50px;
  padding: 15px;
  border: 1px solid var(--light-gray);
  box-sizing: border-box;
  border-radius: ${(props) => props.$borRadius};
`;
const QuantityDisplay = styled.div`
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 25px;
  padding: 15px;
  border: 1px solid var(--light-gray);
  border-left: none;
  border-right: none;
  box-sizing: border-box;
`;
const CartProductInfo = styled.div``;

export default ShoppingCart;
