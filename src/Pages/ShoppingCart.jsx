import React from "react";
import { styled } from "styled-components";

import BasicHeader from "../Components/Header/BasicHeader";
import { Layout } from "../Style/Layout";

const ShoppingCart = () => {
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
        <CartInfo></CartInfo>
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

const CartInfo = styled.section`
  width: 100%;
  height: 200px;
  border-radius: 10px;
`;
const CartImg = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 10px;
`;

const CartProductInfo = styled.div` `
export default ShoppingCart;
