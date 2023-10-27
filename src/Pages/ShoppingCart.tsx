import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import DeleteCartAPI from "../API/Cart/DeleteCartAPI";
import GetCartAPI from "../API/Cart/GetCartAPI";
import logo from "../Assets/Icons/mulkong-gray.svg";
import plus from "../Assets/Icons/plus-icon_2.svg";
import equal from "../Assets/Icons/equal-icon.svg";

import BasicHeader from "../Components/Header/BasicHeader";
import { Layout, Header } from "../Style/Layout";
import Button from "../Components/Common/Button";
import del from "../Assets/Icons/icon-delete.svg";
import DeleteAllCartsAPI from "../API/Cart/DeleteAllCartsAPI";
import FlexLayout from "../Style/FlexLayout";
import { useNavigate } from "react-router-dom";
import {
  CartItem,
  CartImg,
  CartProvider,
  CartName,
  CartPrice,
  CartShipping,
  QuantityLayout,
} from "Style/CartItemStyle";
import MetaTag from "Components/Common/MetaTag";
import ProductDetailAPI from "API/Product/ProductDetailAPI";
import userToken from "Recoil/userToken/userToken";
import { productDetail } from "./ProductDetail";
import Loading from "Components/Loading";
import apiCartItems from "Recoil/cart/apiCartItems";

interface QuantityButtonType {
  $borRadius: string;
}

export interface CartItemsType {
  count: number;
  next: string | null;
  previous: string | null;
  results: CartInfoType[];
}

interface CartInfoType {
  cart_item_id: number;
  is_active: boolean;
  my_cart: number;
  product_id: number;
  quantity: number;
}

export interface ApiCartType extends productDetail {
  quantity: number;
  cart_item_id: number;
}
const ShoppingCart = () => {
  const navigate = useNavigate();
  const token = useRecoilValue(userToken);

  const fetchCartItem = GetCartAPI();

  const [apiCart, setApiCart] = useRecoilState<ApiCartType[]>(apiCartItems);
  const [loading, setLoading] = useState(true);

  const [totalPrice, setTotalPrice] = useState({
    priceSum: 0,
    shippingFeeSum: 0,
    total: 0,
  });
  const delCartItem = DeleteCartAPI();
  const handleDeleteAllCart = DeleteAllCartsAPI();

  const handleDeleteAllCartItems = async () => {
    await handleDeleteAllCart();
    setApiCart([]);
  };

  const handleDeleteCart = async (cartId: number) => {
    await delCartItem(cartId);
    const existingItemIndex = apiCart.findIndex(
      (el) => el.cart_item_id === cartId
    );
    const deletedCart = [...apiCart];
    deletedCart.splice(existingItemIndex, 1);
    setApiCart([...deletedCart]);
  };

  useEffect(() => {
    let sum = 0;
    let deliverySum = 0;
    apiCart.map((el) => {
      sum += el.price * el.quantity;
      deliverySum += el.shipping_fee;

      return setTotalPrice((prev) => ({
        ...prev,
        priceSum: sum,
        shippingFeeSum: deliverySum,
        total: sum + deliverySum,
      }));
    });
  }, [apiCart]);

  useEffect(() => {
    const getCartItem = async () => {
      const data = await fetchCartItem();
      console.log(data);

      if (data.results) {
        const apiPromises = data.results?.map(async (el) => {
          const getDetail = ProductDetailAPI(el.product_id, token);
          const res = await getDetail();

          const apiResults = {
            ...res,
            quantity: el.quantity,
            cart_item_id: el.cart_item_id,
          };
          return apiResults;
        });

        // 모든 API 호출을 병렬로 실행
        const results = await Promise.all(apiPromises);
        setLoading(false);
        setApiCart(results);
      }
    };
    setLoading(false);
    getCartItem();
  }, []);
  console.log("api 리코일 : ", apiCart);

  return (
    <>
      <MetaTag
        title="Mulkong 마켓 장바구니"
        description="Mulkong 마켓에서 장바구니에 담은 상품들을 확인해보세요"
        url="https://d1aj463p8fjhgr.cloudfront.net/cart"
      />
      <BasicHeader />
      {apiCart && (
        <Layout>
          <Header>장바구니</Header>
          <CartHeader>
            <SelectButtonIndicator />
            <div>상품정보</div>
            <div>수량</div>
            <div>상품금액</div>
          </CartHeader>
          {loading && <Loading />}
          {apiCart?.length === 0 && (
            <div>
              <CartMsg> 장바구니가 비었습니다</CartMsg>
              <EmptyImg src={logo} />
            </div>
          )}
          {apiCart?.length > 0 && (
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
                총
                <strong style={{ color: "var(--primary" }}>
                  {apiCart.length}
                </strong>
                개
              </div>
            </FlexLayout>
          )}
          {apiCart?.map((el, i) => {
            return (
              <CartItem key={i}>
                <CartImg src={el.image} />
                <div>
                  <CartProvider>{el.store_name}</CartProvider>
                  <CartName>{el.product_name}</CartName>
                  <CartPrice>{el.price?.toLocaleString()}원</CartPrice>
                  <CartShipping>
                    {el?.shipping_method === "PARCEL" ? "택배배송" : "화물배달"}
                    &nbsp; /&nbsp;
                    {el?.shipping_fee !== 0
                      ? `${el?.shipping_fee.toLocaleString()}원`
                      : "무료배송"}
                  </CartShipping>
                </div>
                <QuantityLayout>
                  {/* <QuantityButton $borRadius="8px 0 0 8px"> */}
                  {/* <FontAwesomeIcon icon={faMinus} /> */}
                  {/* </QuantityButton> */}
                  <QuantityDisplay>{el.quantity}개</QuantityDisplay>
                  {/* <div>{el.quantity}개</div> */}
                  {/* <QuantityButton $borRadius=" 0 8px 8px 0 ">
                    <FontAwesomeIcon icon={faPlus} />
                  </QuantityButton> */}
                </QuantityLayout>
                <div
                  style={{
                    position: "absolute",
                    right: "100px",
                    textAlign: "center",
                  }}
                >
                  <CartPrice color="red" $mb="0">
                    {(
                      el.price * el.quantity +
                      el.shipping_fee
                    ).toLocaleString()}
                    원
                  </CartPrice>
                  {/* <Button $padding="10px" width="130px">
                    주문하기
                  </Button> */}
                </div>
                <DeleteButton
                  onClick={() => {
                    handleDeleteCart(el?.cart_item_id!);
                  }}
                />
              </CartItem>
            );
          })}
          {apiCart.length > 0 && (
            <>
              <TotalPriceLayout>
                <div>
                  <PriceInfo>총 상품금액</PriceInfo>
                  <Price>{totalPrice.priceSum.toLocaleString()}원</Price>
                </div>
                <img src={plus} alt="더하기" />
                <div>
                  <PriceInfo>배송비</PriceInfo>
                  <Price>{totalPrice.shippingFeeSum.toLocaleString()}원</Price>
                </div>
                <img src={equal} alt="equal" />
                <div>
                  <PriceInfo>결제 예정 금액</PriceInfo>
                  <Price color="red">
                    {totalPrice.total.toLocaleString()}원
                  </Price>
                </div>
              </TotalPriceLayout>

              <Button
                width="200px"
                $margin="0 auto"
                onClick={() => {
                  navigate("/order", { state: totalPrice });
                }}
              >
                주문하기
              </Button>
            </>
          )}
        </Layout>
      )}
    </>
  );
};

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

const EmptyImg = styled.img`
  width: 1000px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
`;
const CartMsg = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 36px;
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

const QuantityButton = styled.button<QuantityButtonType>`
  width: 50px;
  height: 50px;
  padding: 15px;
  border: 1px solid var(--light-gray);
  box-sizing: border-box;
  border-radius: ${(props) => props.$borRadius};
`;
const QuantityDisplay = styled.div`
  position: absolute;
  width: 50px;
  font-size: 18px;
  /* right: 70%; */
  /* height: 50px; */
  /* text-align: center;
  line-height: 25px;
  padding: 15px; */
  /* border: 1px solid var(--light-gray); */
  /* border-left: none;
  border-right: none;
  box-sizing: border-box; */
`;

const TotalPriceLayout = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 46px 0;
  margin: 40px 0;
  background-color: var(--light-gray);
  border-radius: 10px;
  box-sizing: border-box;
  align-items: center;
`;

const PriceInfo = styled.div`
  font-size: 16px;
  margin-bottom: 16px;
  text-align: center;
`;
const Price = styled.div`
  font-size: 26px;
  text-align: center;
  color: ${(props) => props.color || "black"};
`;
export default ShoppingCart;
