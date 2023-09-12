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

export { Layout, LayoutStyle };
