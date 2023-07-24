import React from "react";
import { styled } from "styled-components";

const ErrorMsg = (props) => {
  return <Msg>{props.children}</Msg>;
};

const Msg = styled.div`
  color: #EB5757;
  margin: 26px 0;
`;
export default ErrorMsg;
