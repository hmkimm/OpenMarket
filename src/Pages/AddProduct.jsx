import React, { useState } from "react";
import { styled } from "styled-components";

import BasicHeader from "../Components/Header/BasicHeader";
import imgicon from "../Assets/Icons/icon-img.svg";
import UnitInput from "../Components/UnitInput";

const AddProduct = () => {
  const [inputs, setInputs] = useState({
    product_name: "",
    image: "",
    price: "",
    shipping_method: "", // PARCEL 또는 DELIVERY 선택
    shipping_fee: "",
    stock: "",
    product_info: "",
  });
  return (
    <>
      <BasicHeader />
      <h1
        style={{
          fontSize: "36px",
          fontWeight: "700",
          lineHeight: "44px",
          marginBottom: "42px",
        }}
      >
        상품 등록
      </h1>
      <BodyLayout>
        <div>
          <Title>상품이미지</Title>
          <label htmlFor="file-upload">
            <Image />
          </label>
          <input type="file" id="file-upload" className="a11y-hidden" />
        </div>
        <div>
          <Title>상품명</Title>
          <TextInput type="text" />
          <UnitInput title="판매가">원</UnitInput>
          <UnitInput title="기본 배송비">원</UnitInput>
          <UnitInput title="재고">개</UnitInput>
        </div>
      </BodyLayout>
    </>
  );
};

const BodyLayout = styled.div`
  display: flex;
  gap: 40px;
`;

const Title = styled.p`
  margin-bottom: 10px;
  font-weight: 400;
  color: var(--767676, #767676);
`;

const Image = styled.div`
  width: 454px;
  height: 454px;
  /* src: url(${imgicon}); */
  background-color: #c4c4c4;
  cursor: pointer;

  img {
    width: 50px;
    height: 50px;
  }
`;

const TextInput = styled.input`
  width: 826px;
  height: 54px;
  border: 1px solid var(--c-4-c-4-c-4, #c4c4c4);
  border-radius: 5px;
  padding: 17px 16px;
  font-size: 16px;
  margin-bottom: 16px;
`;

export default AddProduct;
