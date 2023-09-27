import { ReactNode, useEffect } from "react";
import styled from "styled-components";

interface AlertBoxProps {
  children: ReactNode;
  transY?: string;
}
interface BoxLayoutType {
  transY?: string;
}
const AlertBox = (props: AlertBoxProps) => {
  const { children, ...rest } = props;

  return (
    <>
      <Bg />
      <BoxLayout {...rest}>{children}</BoxLayout>
    </>
  );
};

const Bg = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #454343f7;
  opacity: 0.9;
`;
const BoxLayout = styled.div<BoxLayoutType>`
  width: 500px;
  height: 220px;
  background-color: white;
  color: var(--primary);

  margin: 0 auto;
  border-radius: 20px;
  font-size: 23px;
  text-align: center;
  line-height: 220px;
  transform: translate(-50%, -50%);
  animation: slideUp 1s ease-in-out forwards;

  @keyframes slideUp {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(${(props) => props.transY || "-190%"});
    }
  }
`;

export default AlertBox;
