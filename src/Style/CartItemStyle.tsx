import styled from "styled-components";
import del from "../Assets/Icons/icon-delete.svg";

interface QuantityButtonType {
  $borRadius: string;
}
interface CartPriceType {
  $mb?: string;
}

const CartItem = styled.section`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  height: 200px;
  border: 2px solid var(--light-gray);
  padding: 0 100px 0 30px;
  margin-bottom: 10px;
  border-radius: 10px;
  box-sizing: border-box;
`;

const CartImg = styled.img`
  width: 160px;
  height: 160px;
  margin-right: 36px;
  border-radius: 10px;
`;

const CartProvider = styled.div`
  color: var(--gray);
  margin-bottom: 10px;
`;

const CartName = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
`;

const CartPrice = styled.div<CartPriceType>`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: ${(props) => props.$mb || "40px"};
  color: ${(props) => props.color};
`;

const CartShipping = styled.div`
  color: var(--gray);
`;


const DeleteButton = styled.button`
  display: block;
  width: 22px;
  height: 22px;
  position: absolute;
  top: 18px;
  right: 18px;
  background: url(${del}) no-repeat center;
`;

const QuantityLayout = styled.div`
  position: absolute;
  display: flex;
  right: 378px;
`;
const QuantityButton = styled.button<QuantityButtonType>`
  width: 50px;
  height: 50px;
  padding: 15px;
  border: 1px solid var(--light-gray);
  box-sizing: border-box;
  border-radius: ${(props) => props.$borRadius};
`;
const QuantityDisplay = styled.div`
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 25px;
  padding: 15px;
  border: 1px solid var(--light-gray);
  border-left: none;
  border-right: none;
  box-sizing: border-box;
`;

export {
  CartItem,
  CartImg,
  CartProvider,
  CartName,
  CartPrice,
  CartShipping,
  DeleteButton,
  QuantityLayout,
  QuantityButton,
  QuantityDisplay,
};
