import { Interface } from "readline";
import { styled } from "styled-components";

interface FlexLayout {
  $jc?: string;
  $ai?: string;
  $gap?: string;
  $margin?: string;
}
const FlexLayout = styled.div<FlexLayout>`
  display: flex;
  justify-content: ${(props) => props.$jc || "center"};
  align-items: ${(props) => props.$ai || "center"};
  gap: ${(props) => props.$gap || 0};
  margin: ${(props) => props.$margin};
`;

export default FlexLayout;
