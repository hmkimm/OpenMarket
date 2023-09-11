import React, { useEffect } from "react";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import FlexLayout from "../Style/FlexLayout";

interface CountButtonProps {
  setOrderNum: (orderNum: number) => void;
  orderNum: number;
  handleCountChange: (orderNum: number) => void;
  productStock: number;
  children: React.ReactNode;
}

interface Button {
  $br?: string;
}

const CountButton = (props: CountButtonProps) => {
  const { setOrderNum, orderNum, handleCountChange, productStock } = props;

  const handlePlus = () => {
    console.log("카운트 버튼 내 재고", productStock);
    console.log("카운트 버튼 내 주문수량", orderNum);
    if (productStock >= orderNum + 1) {
      setOrderNum(orderNum + 1);
      handleCountChange(orderNum + 1);
    } else {
      alert("재고가 부족합니다!");
    }
  };

  const handleMinus = () => {
    if (orderNum > 1) {
      setOrderNum(orderNum - 1);
      handleCountChange(orderNum - 1);
    }
  };

  useEffect(() => {}, [handlePlus, handleMinus]);

  return (
    <FlexLayout $jc="flex-start">
      <Button onClick={handleMinus} $br="5px 0 0 5px">
        <FontAwesomeIcon icon={faMinus} />
      </Button>
      <Number>{props.children}</Number>
      <Button onClick={handlePlus} $br=" 0 5px 5px 0">
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </FlexLayout>
  );
};

const Button = styled.button<Button>`
  width: 50px;
  height: 50px;
  padding: 15px;
  border: 1px solid var(--light-gray);
  box-sizing: border-box;
  border-radius: ${(props) => props.$br};
`;

const Number = styled.div`
  width: 50px;
  height: 50px;
  text-align: center;
  border-top: 1px solid var(--light-gray);
  border-bottom: 1px solid var(--light-gray);
  line-height: 50px;
  box-sizing: border-box;
`;
export default CountButton;
