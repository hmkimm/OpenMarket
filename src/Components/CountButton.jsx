import React from "react";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import FlexLayout from "../Style/FlexLayout";

const CountButton = (props) => {
  const { setOrderNum, orderNum } = props;

  const handlePlus = () => {
    setOrderNum(orderNum + 1);
  };

  const handleMinus = () => {
    if (orderNum > 1) setOrderNum(orderNum - 1);
  };
  return (
    <FlexLayout jc="flex-start">
      <Button onClick={handleMinus} br="5px 0 0 5px">
        <FontAwesomeIcon icon={faMinus} />
      </Button>
      <Number>{props.children}</Number>
      <Button onClick={handlePlus} br=" 0 5px 5px 0">
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </FlexLayout>
  );
};

const Button = styled.button`
  width: 50px;
  height: 50px;
  padding: 15px;
  border: 1px solid var(--light-gray);
  box-sizing: border-box;
  border-radius: ${(props) => props.br};
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