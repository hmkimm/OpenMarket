import BasicHeader from "Components/Header/BasicHeader";
import { useRecoilState, useRecoilValue } from "recoil";
import cartProducts from "Recoil/cart/cartProducts";

import { CartItemType } from "\btypes";
import styled from "styled-components";
import Button from "Components/Common/Button";
import { Layout, Header } from "Style/Layout";
import {
  CartItem,
  CartImg,
  CartProvider,
  CartName,
  CartPrice,
  CartShipping,
  QuantityLayout,
} from "Style/CartItemStyle";
import { useEffect, useState } from "react";
import HorizontalLine from "Style/HorizontalLine";
import Input from "Components/Input";
import FlexLayout from "Style/FlexLayout";
import { useLocation, useNavigate } from "react-router-dom";
import AlertBox from "Components/AlertBox";
import MetaTag from "Components/Common/MetaTag";
import apiCartItems from "Recoil/cart/apiCartItems";
import { ApiCartType } from "./ShoppingCart";
import product from "Recoil/cart/product";
import DeleteAllCartsAPI from "API/Cart/DeleteAllCartsAPI";

interface FinalPaymentText {
  size?: string;
  mb?: string;
}

const Order = () => {
  const navigate = useNavigate();
  const [, setTotalSum] = useState(0);
  const [isPaid, setIsPaid] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const location = useLocation();
  const totalPrice = location.state;
  const [apiCart, setApiCart] = useRecoilState<ApiCartType[]>(apiCartItems);
  const handleDeleteAllCart = DeleteAllCartsAPI();

  const [directProduct, setDirectProduct] = useRecoilState(product);

  const handleInputCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleBuying = async () => {
    if (totalPrice) {
      await handleDeleteAllCart();
      setApiCart([]);
    }

    const handleAlertBox = async () => {
      setIsPaid(true);

      await delay(1500);
      setIsPaid(false);

      navigate("/buyermain");
    };
    handleAlertBox();
  };

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    let sum = 0;
    apiCart.map((el) => {
      return (sum += el.price * el.quantity + el?.shipping_fee);
    });
    setTotalSum(sum);
  }, [apiCart]);

  console.log("바로구매 : ", directProduct);
  console.log("장바구니 : ", apiCart);
  useEffect(() => {
    return () => {
      setDirectProduct("");
    };
  }, []);
  console.log(totalPrice);
  return (
    <>
      <MetaTag
        title="Mulkong 마켓 결제하기"
        description="Mulkong 마켓에서 장바구니에 담은 물품들을 결제해보세요"
        url="https://d1aj463p8fjhgr.cloudfront.net/order"
      />
      <BasicHeader />
      <Layout>
        <Header>주문/결제하기</Header>
        {directProduct ? (
          <>
            <CartItem>
              <CartImg src={directProduct?.image} />
              <div>
                <CartProvider>{directProduct.store_name}</CartProvider>
                <CartName>{directProduct.product_name}</CartName>
                <CartPrice>{directProduct.price?.toLocaleString()}원</CartPrice>
                <CartShipping>
                  {directProduct?.shipping_method === "PARCEL"
                    ? "택배배송"
                    : "화물배달"}
                  &nbsp; /&nbsp;
                  {directProduct?.shipping_fee !== 0
                    ? `${directProduct?.shipping_fee?.toLocaleString()}원`
                    : "무료배송"}
                </CartShipping>
              </div>
              <QuantityLayout>
                <QuantityDisplay>{directProduct.orderNum}개</QuantityDisplay>
              </QuantityLayout>
              <div
                style={{
                  position: "absolute",
                  right: "100px",
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                <CartPrice $mb="0">
                  {(
                    directProduct.price * directProduct.orderNum +
                    directProduct?.shipping_fee
                  )?.toLocaleString()}
                  원
                </CartPrice>
              </div>
            </CartItem>

            <TotalPrice>
              총 주문금액 :
              <span style={{ color: "red" }}>
                &nbsp;{" "}
                {(
                  directProduct.price * directProduct.orderNum +
                  directProduct?.shipping_fee
                )?.toLocaleString()}
                원
              </span>
            </TotalPrice>
          </>
        ) : (
          <>
            {apiCart?.map((el, i) => {
              return (
                <CartItem key={i}>
                  <CartImg src={el.image} />
                  <div>
                    <CartProvider>{el.store_name}</CartProvider>
                    <CartName>{el.product_name}</CartName>
                    <CartPrice>{el.price?.toLocaleString()}원</CartPrice>
                    <CartShipping>
                      {el?.shipping_method === "PARCEL"
                        ? "택배배송"
                        : "화물배달"}
                      &nbsp; /&nbsp;
                      {el?.shipping_fee !== 0
                        ? `${el?.shipping_fee?.toLocaleString()}원`
                        : "무료배송"}
                    </CartShipping>
                  </div>
                  <QuantityLayout>
                    <QuantityDisplay>{el.quantity}개</QuantityDisplay>
                  </QuantityLayout>
                  <div
                    style={{
                      position: "absolute",
                      right: "100px",
                      textAlign: "center",
                      alignItems: "center",
                    }}
                  >
                    <CartPrice $mb="0">
                      {(
                        el.price * el.quantity +
                        el?.shipping_fee
                      )?.toLocaleString()}
                      원
                    </CartPrice>
                  </div>
                </CartItem>
              );
            })}
            <TotalPrice>
              총 주문금액 :
              <span style={{ color: "red" }}>
                &nbsp;{totalPrice?.total?.toLocaleString()}원
              </span>
            </TotalPrice>
          </>
        )}

        <H2>배송정보</H2>
        <HorizontalLine />
        <DeliveryLayout>
          <div>
            <BuyingInfo>주문자 정보</BuyingInfo>
            <Input label="이름" id="name" />
            <Input label="휴대폰" id="phone" type="tel" />
          </div>
          <VerticalLine />
          <div>
            <BuyingInfo>배송지 정보</BuyingInfo>
            <Input label="수령인" id="receiver" />
            <Input label="휴대폰" id="receiver-phone" />
            <Input label="배송주소" id="address" />
          </div>
        </DeliveryLayout>
        <HorizontalLine />
        <FlexLayout $gap="40px" $ai="start" style={{ marginTop: "70px" }}>
          <div style={{ width: "60%" }}>
            <H2>결제수단</H2>
            <HorizontalLine />
            <FlexLayout $jc="space-around">
              <div>
                <RadioInput id="card" name="paymentMethod" />
                <Label htmlFor="card">신용/체크카드</Label>
              </div>
              <div>
                <RadioInput id="deposit" name="paymentMethod" />
                <Label htmlFor="deposit">무통장 입금</Label>
              </div>
              <div>
                <RadioInput id="mobile" name="paymentMethod" />
                <Label htmlFor="mobile">휴대폰 결제</Label>
              </div>
              <div>
                <RadioInput id="naver" name="paymentMethod" />
                <Label htmlFor="naver">네이버페이</Label>
              </div>
              <div>
                <RadioInput id="kakao" name="paymentMethod" />
                <Label htmlFor="kakao">카카오페이</Label>
              </div>
            </FlexLayout>
            <HorizontalLine />
          </div>

          <div>
            <H2>최종 결제 정보</H2>
            <FinalPayment>
              <FlexLayout $jc="space-between">
                <FinalPaymentInfo>- 상품금액</FinalPaymentInfo>
                <FinalPaymentInfo>
                  {directProduct
                    ? (
                        directProduct.price * directProduct.orderNum
                      )?.toLocaleString()
                    : totalPrice?.priceSum?.toLocaleString()}
                  원
                </FinalPaymentInfo>
              </FlexLayout>
              <FlexLayout $jc="space-between">
                <FinalPaymentInfo>- 배송비</FinalPaymentInfo>
                <FinalPaymentInfo>
                  {directProduct?.shipping_fee?.toLocaleString() ||
                    totalPrice?.shippingFeeSum?.toLocaleString()}
                  원
                </FinalPaymentInfo>
              </FlexLayout>
              <HorizontalLine />
              <FlexLayout $jc="space-between" $margin="0 0 20px 0">
                <FinalPaymentInfo>- 결제금액</FinalPaymentInfo>
                <FinalPaymentInfo color="red" size="22px">
                  {directProduct
                    ? (
                        directProduct.price * directProduct.orderNum +
                        directProduct?.shipping_fee
                      )?.toLocaleString()
                    : totalPrice?.total?.toLocaleString()}
                  원
                </FinalPaymentInfo>
              </FlexLayout>
              <input type="checkbox" id="notice" onChange={handleInputCheck} />
              <label htmlFor="notice">
                주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.
              </label>
              <Button
                disabled={!isChecked}
                type="submit"
                onClick={() => {
                  handleBuying();
                }}
              >
                결제하기
              </Button>
            </FinalPayment>
          </div>
        </FlexLayout>
      </Layout>
      {isPaid && <AlertBox>결제되었습니다 !</AlertBox>}
    </>
  );
};

const QuantityDisplay = styled.div`
  font-size: 18px;
`;
const TotalPrice = styled.div`
  margin: 35px 0 25px 0;
  text-align: end;
  font-size: 20px;
`;

const H2 = styled.h2`
  font-size: 20px;
`;

const DeliveryLayout = styled.section`
  display: flex;
  justify-content: space-around;
`;

const VerticalLine = styled.div`
  border: 1px solid var(--light-gray);
`;
const BuyingInfo = styled.div`
  margin-bottom: 40px;
`;

const RadioInput = styled.input.attrs({ type: "radio" })`
  border: 1px solid var(--gray);
  width: 15px;
  height: 15px;
  margin: 0 8px 0 0;
`;

const Label = styled.label`
  padding: 5px;
`;

const FinalPayment = styled.div`
  border: 2px solid var(--primary);
  border-radius: 10px;
  width: 480px;
  height: 340px;
  margin-top: 18px;
  padding: 34px;
  box-sizing: border-box;
`;

const FinalPaymentInfo = styled.div<FinalPaymentText>`
  margin-bottom: ${(props) => props.mb || "14px"};
  font-size: ${(props) => props.size || "16px"};
  color: ${(props) => props.color || "black"};
`;
export default Order;
