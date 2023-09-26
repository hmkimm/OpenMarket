import { Children } from "react";
import styled from "styled-components";

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
  margin?: string;
  left?: string;
}

interface Div {
  margin?: string;
}

const Input = (props: InputProps) => {
  const { id, label, type, ...rest } = props;
  return (
    <InputLayout>
      <Label htmlFor={id}>{label}</Label>
      <TextInput id={id} type={type || "text"} {...rest} />
    </InputLayout>
  );
};

const InputLayout = styled.div<Div>`
  margin: ${(props) => props.margin || "0 0  40px 0"};
  display: flex;
  align-items: center;
`;
const Label = styled.label`
  width: 80px;
  margin-right: 80px;
`;

const TextInput = styled.input`
  border: 1px solid var(--light-gray);
  width: ${(props) => props.width || "334px"};
  height: 40px;
  padding: 15px;
`;
export default Input;
