import React from "react";
import styled from "styled-components";
import spinner from "../Assets/Icons/spinner.gif";

const Loading = () => {
  return (
    <Background>
      <Text>Loading...</Text>
      <img src={spinner} alt="로딩중" width="5%" />
    </Background>
  );
};

const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #e3e2e2f3;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text = styled.div`
  font: 1.6rem "Noto Sans KR";
  text-align: center;
`;
export default Loading;
