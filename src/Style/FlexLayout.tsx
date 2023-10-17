import { styled } from "styled-components";

interface FlexLayoutType {
  $jc?: string;
  $ai?: string;
  $gap?: string;
  $margin?: string;
}
const FlexLayout = styled.div<FlexLayoutType>`
  display: flex;
  justify-content: ${(props) => props.$jc || "center"};
  align-items: ${(props) => props.$ai || "center"};
  gap: ${(props) => props.$gap || 0};
  margin: ${(props) => props.$margin};
`;

export default FlexLayout;
