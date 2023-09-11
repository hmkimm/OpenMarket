import { ButtonHTMLAttributes, ReactNode } from "react";
import { styled } from "styled-components";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string;
  display?: string;
  $padding?: string;
  $margin?: string;
  empty?: boolean;
}

const Button = ({ children, ...props }: ButtonProps) => {
  return <ButtonStyle {...props}>{children}</ButtonStyle>;
};

const ButtonStyle = styled.button<ButtonProps>`
  width: ${(props) => props.width || "100%"};
  display: ${(props) => props.display || "block"};
  padding: ${(props) => props.$padding || "19px"};
  margin: ${(props) => props.$margin || "36px 0 0 0"};
  background-color: ${(props) =>
    props.empty ? "var(--light-gray)" : "var(--primary)"};
  border-radius: 5px;
  font-size: 18px;
  color: #fff;
`;
export default Button;
