import { ReactNode } from "react";
import styled from "styled-components";

interface AlertBoxProps {
  children: ReactNode;
}
const AlertBox = (props: AlertBoxProps) => {
  return (
    <>
      <Bg />
      <BoxLayout>{props.children}</BoxLayout>
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
const BoxLayout = styled.div`
  width: 500px;
  height: 200px;
  background-color: white;
  color: var(--primary);
  margin: 0 auto;
  border-radius: 20px;
  font-size: 26px;
  text-align: center;
  line-height: 200px;

  transform: translate(-50%, -50%);
  animation: slideDown 1s ease-in, slideUp 1s ease-in-out forwards;

  @keyframes slideDown {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-390%);
    }
  }
`;

export default AlertBox;
