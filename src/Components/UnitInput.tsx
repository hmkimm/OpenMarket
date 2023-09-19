import React, { InputHTMLAttributes } from "react";
import { styled } from "styled-components";

interface UnitInputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  name: string;
  value: number;
  children: React.ReactNode;
}
const UnitInput = (props: UnitInputProps) => {
  return (
    <>
      <Title>{props.title}</Title>
      <Layout>
        <Input
          onChange={props.onChange}
          name={props.name}
          value={props.value}
          type="number"
        />
        <Unit>{props.children}</Unit>
      </Layout>
    </>
  );
};

const Layout = styled.div`
  width: 220px;
  display: flex;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 16px;
  box-sizing: border-box;
`;

const Title = styled.div`
  margin-bottom: 10px;
  font-weight: 400;
  color: var(--767676, #767676);
`;

const Input = styled.input`
  width: 166px;
  padding: 17px 0 17px 16px;
  font-size: 16px;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Unit = styled.div`
  width: 54px;
  height: 54px;
  line-height: 54px;
  text-align: center;
  background-color: #c4c4c4;
  border-radius: 0 5px 5px 0;
  color: white;
  font-size: 16px;
`;

export default UnitInput;
