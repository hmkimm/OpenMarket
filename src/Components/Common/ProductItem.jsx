import React from "react";

import pouch from "../../Assets/Icons/pouch.svg";
import { styled } from "styled-components";

export default function ProductItem(props) {
  return (
    <ProductLayout>
      <ProductImg src={props.img || pouch} alt="노트북 파우치" />
      <ProductSeller>{props.seller}</ProductSeller>
      <ProductName>{props.name}</ProductName>
      <Price>
        {props.price}
        <span>원</span>
      </Price>
    </ProductLayout>
  );
}
const ProductLayout = styled.div`
  width: 380px;
`;

const ProductImg = styled.img`
  width: 380px;
  height: 380px;
  border-radius: 10px;
  margin-bottom: 16px;
  src: url(${(props) => props.img});
`;

const ProductSeller = styled.p`
  color: var(--767676, #767676);
  line-height: 22px;
`;

const ProductName = styled.p`
  font-size: 18px;
  margin: 10px 0;
  line-height: 22px;
`;
const Price = styled.strong`
  font-size: 24px;
  font-weight: 700;

  span {
    font-size: 16px;
    font-weight: 400;
  }
`;
