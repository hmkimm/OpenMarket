import { Children } from "react";
import styled from "styled-components";

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
  margin?: string;
  left?: string;
  display?: string;
  mb?: string;
  labelwidth?: string;
}

interface Div {
  margin?: string;
  display?: string;
}
interface LabelType {
  mb?: string;
  labelwidth?: string;
}
const Input = (props: InputProps) => {
  const { id, display, margin, labelwidth, label, type, mb, ...rest } = props;
  return (
    <InputLayout display={display} margin={margin}>
      <Label htmlFor={id} mb={mb} labelwidth={labelwidth}>
        {label}
      </Label>
      <TextInput id={id} type={type || "text"} {...rest} />
    </InputLayout>
  );
};

const InputLayout = styled.div<Div>`
  margin: ${(props) => props.margin || "0 0  40px 0"};
  display: ${(props) => props.display || "flex"};

  align-items: center;
`;
const Label = styled.label<LabelType>`
  width: ${(props) => props.labelwidth || "80px"};
  margin-right: 80px;
  display: block;
  margin-bottom: ${(props) => props.mb};
  color: var(--gray);
`;

const TextInput = styled.input`
  border: 1px solid var(--light-gray);
  width: ${(props) => props.width || "334px"};
  height: ${(props) => props.height || "40px"};
  padding: 15px;
`;
export default Input;
