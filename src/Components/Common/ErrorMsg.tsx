import { HTMLAttributes, ReactNode } from "react";
import { styled } from "styled-components";

interface ErrMsgProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  color?: string;
  margin?: string;
}

const ErrorMsg = (props: ErrMsgProps) => {
  const { children, ...rest } = props;

  return <Msg {...rest}>{children}</Msg>;
};

const Msg = styled.div<ErrMsgProps>`
  color: ${(props) => props.color || "#eb5757"};
  margin: ${(props) => props.margin || "26px 0"};
`;
export default ErrorMsg;
