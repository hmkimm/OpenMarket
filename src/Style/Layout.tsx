import styled, { css } from "styled-components";

const LayoutStyle = css`
  width: 1280px;
  margin: 0 auto;
  padding-top: 120px;
`;

const Layout = styled.div`
  ${(props) => css`
    ${LayoutStyle}
  `}
`;

const HeaderLayout = styled.div`
  display: flex;
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  padding: 22px 0;
  margin-bottom: 20px;
  justify-content: space-around;
  background: #fff;
  box-shadow: 4px 0 6px rgba(0, 0, 0, 0.4);
`;
export { Layout, LayoutStyle, HeaderLayout };
