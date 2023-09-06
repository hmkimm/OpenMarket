import React from "react";
import { styled } from "styled-components";

const Button = (props) => {
  return <ButtonStyle {...props}>{props.children}</ButtonStyle>;
};

const ButtonStyle = styled.button`
  width: ${(props) => props.width || "100%"};
  display: ${(props) => props.display || "block"};
  padding: ${(props) => props.padding || "19px"};
  margin: ${(props) => props.margin || "36px 0 0 0"};
  background-color: ${(props) => (props.empty ? "var(--gray)" : "var(--primary)")};
  border-radius: 5px;
  font-size: 18px;
  color: #fff;
`;
export default Button;
