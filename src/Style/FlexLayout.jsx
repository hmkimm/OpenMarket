import { styled } from "styled-components";

const FlexLayout = styled.div`
  display: flex;
  justify-content: ${(props) => props.$jc || "center"};
  align-items: ${(props) => props.$ai || "center"};
  gap: ${(props) => props.$gap || 0};
`;

export default FlexLayout;
