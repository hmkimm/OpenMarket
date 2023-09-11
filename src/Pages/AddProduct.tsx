import React, { TextareaHTMLAttributes, useState } from "react";
import { styled } from "styled-components";
import { useRecoilValue } from "recoil";

import BasicHeader from "../Components/Header/BasicHeader";
import imgicon from "../Assets/Icons/icon-img.svg";
import UnitInput from "../Components/UnitInput";

import AddProductAPI from "../Utils/Product/AddProductAPI";
import userToken from "../Recoil/userToken/userToken";

interface Button {
  width?: string;
  padding?: string;
  name?: string;
  value?: string;
  isSelected?: boolean;
}

interface ProductInfo extends TextareaHTMLAttributes<HTMLTextAreaElement> {}
const AddProduct = () => {
  const token = useRecoilValue(userToken);
  const [inputs, setInputs] = useState({
    product_name: "",
    image: "",
    price: "",
    shipping_method: "", // PARCEL 또는 DELIVERY 선택
    shipping_fee: "",
    stock: "",
    product_info: "",
  });
  console.log(inputs);
  const [selectedBtn, setSelectedBtn] = useState<null | string>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log("handlesumbmit 호출");
    const res = await AddProductAPI({ inputs, token });
    console.log(res);
  };
  return (
    <>
      <BasicHeader />
      <Layout>
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "700",
            lineHeight: "44px",
            marginBottom: "42px",
            padding: "0 120px",
          }}
        >
          상품 등록
        </h1>
        <BodyLayout>
          <div>
            <p style={{ color: "red" }}>*상품 등록 주의사항</p>
            <AlertMsg>
              - 너무 귀여운 사진은 심장이 아파올 수 있습니다.
              <br />
              <br /> - 유소년에게서 천자만홍이 피고 이상이 온갖 들어 약동하다.
              이상의 가지에 사랑의 있는가? 주며, 끓는 힘차게 얼음이 얼음 가치를
              황금시대의 있음으로써 사라지지 것이다. 이 뜨거운지라, 이상의
              속에서 이것은 피가 보배를 황금시대의 싹이 사막이다.
              <br />
              <br /> - 자신과 우는 옷을 지혜는 아니다. 더운지라 설레는 기쁘며,
              위하여서, 평화스러운 광야에서 그리하였는가? 소담스러운 위하여
              인도하겠다는 어디 무엇을 이상을 같지 따뜻한 청춘 칼이다.
              <br />
              <br /> - 가치를 그들을 예수는 찬미를 가슴이 과실이 이것이다.
              희망의 것이다.보라, 풍부하게 이것은 황금시대를 얼마나 인간에 돋고,
              이것이다.
            </AlertMsg>
          </div>
          <div>
            <Title>상품이미지</Title>
            <label htmlFor="file-upload">
              <Image />
            </label>
            <input type="file" id="file-upload" className="a11y-hidden" />
          </div>
          <div>
            <Title>상품명</Title>
            <TextInput
              onChange={handleInputChange}
              name="product_name"
              value={inputs.product_name}
              type="text"
            />
            <UnitInput
              onChange={handleInputChange}
              name="price"
              value={inputs.price}
              title="판매가"
            >
              원
            </UnitInput>
            <Title>배송방법</Title>
            <Button
              name="shipping_method"
              value="PARCEL"
              //fixme: handleInputChange 수정
              onClick={() => {
                setSelectedBtn("left");
                // handleInputChange(e);
              }}
              isSelected={selectedBtn === "left"}
            >
              택배, 소포, 등기
            </Button>
            <Button
              name="shipping_method"
              value="DELIVERY"
              //fixme: handleInputChange 수정

              onClick={() => {
                setSelectedBtn("right");
                // handleInputChange(e);
              }}
              isSelected={selectedBtn === "right"}
            >
              직접배송(화물배달)
            </Button>
            <UnitInput
              onChange={handleInputChange}
              name="shipping_fee"
              value={inputs.shipping_fee}
              title="기본 배송비"
            >
              원
            </UnitInput>
            <UnitInput
              onChange={handleInputChange}
              name="stock"
              value={inputs.stock}
              title="재고"
            >
              개
            </UnitInput>
          </div>
        </BodyLayout>
        <Title>상품 상세 정보 </Title>
        <ProductInfo
          onChange={handleInputChange}
          name="product_info"
          value={inputs.product_info}
        />
      </Layout>
      <Button width="200px" padding="19px 0">
        취소
      </Button>
      <Button onClick={handleSubmit} width="200px" padding="19px 0">
        저장하기
      </Button>
    </>
  );
};

const Layout = styled.div`
  margin: 0 auto;
`;
const BodyLayout = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  padding: 0 120px;
  margin-bottom: 40px;
`;

const AlertMsg = styled.p`
  width: 320px;
  background: #ffefe8;
  padding: 20px;
  margin-top: 10px;
  font-size: 14px;
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

const Button = styled.button<Button>`
  width: ${(props) => props.width || "220px"};
  height: 54px;
  border-radius: 5px;
  padding: ${(props) => props.padding || "17px 0px"};
  margin: 0 10px 16px 0;
  color: ${(props) => (props.isSelected ? "white" : "#767676")};
  border: 1px solid var(--c-4-c-4-c-4, #c4c4c4);
  background: ${(props) => (props.isSelected ? "#21bf48" : "white")};
  font-size: 16px;
  box-sizing: border-box;
`;

const ProductInfo = styled.textarea<ProductInfo>`
  width: 1320px;
  height: 700px;
`;
export default AddProduct;
