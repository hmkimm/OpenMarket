import  { ReactNode } from "react";
import { styled } from "styled-components";

interface ErrMsgProps {
  children: ReactNode;
}
const ErrorMsg = ({ children }: ErrMsgProps) => {
  return <Msg>{children}</Msg>;
};

const Msg = styled.div`
  color: #eb5757;
  margin: 26px 0;
`;
export default ErrorMsg;
