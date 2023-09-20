import Button from "Components/Common/Button";
import logo from "../Assets/Icons/mulkong.svg";
import { HeaderLayout } from "Style/Layout";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SellerCenter = () => {
  const navigate = useNavigate();
  const navigateMain = () => {
    navigate("/sellermain");
  };
  return (
    <SellerCenterHeader>
      <div>
        <img
          src={logo}
          alt="hodu-market"
          style={{
            width: "124px",
            height: "38px",
            cursor: "pointer",
            verticalAlign: "bottom",
          }}
          onClick={navigateMain}
        />
        <H1>판매자 센터</H1>
      </div>
      <Button
        width="160px"
        $margin="0"
        onClick={() => {
          navigate("/addproduct");
        }}
      >
        상품 등록
      </Button>
    </SellerCenterHeader>
  );
};

const SellerCenterHeader = styled(HeaderLayout)`
  justify-content: space-between;
  padding: 22px 100px;
  align-items: center;
`;

const H1 = styled.h1`
  font-size: 30px;
  margin-left: 16px;
  display: inline-block;
`;

export default SellerCenter;
