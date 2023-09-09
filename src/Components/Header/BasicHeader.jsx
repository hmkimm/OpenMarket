import React from "react";
import { styled } from "styled-components";
import { useRecoilState } from "recoil";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../Assets/Icons/Logo-hodu.svg";
import search from "../../Assets/Icons/search.svg";
import cart from "../../Assets/Icons/shopping-cart.svg";
import user from "../../Assets/Icons/icon-user.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import userToken from "../../Recoil/userToken/userToken";

const BasicHeader = () => {
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(userToken);

  const handleLogout = () => {
    alert("로그아웃 하시겠습니까?");
    setToken("");
    navigate("/");
  };

  const navigateMain = () => {
    navigate("/buyermain");
  };

  return (
    <Layout>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={logo}
          alt="hodu-market"
          style={{ width: "124px", height: "38px", cursor: "pointer" }}
          onClick={navigateMain}
        />
        <SearchLayout>
          <SearchInput placeholder="상품을 검색해보세요!" />
          <SearchBtn />
        </SearchLayout>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to="/cart">
          <IconBtnLayout
            onClick={() => {
              navigate("/cart");
            }}
          >
            <IconBtn $bg={cart} />
            <span>장바구니</span>
          </IconBtnLayout>
        </Link>
        <IconBtnLayout>
          <IconBtn $bg={user} />
          <span>마이페이지</span>
        </IconBtnLayout>
        <IconBtnLayout>
          <button onClick={handleLogout}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} size="2xl" />
            <div style={{ marginTop: "5px", fontSize: "16px" }}>로그아웃</div>
          </button>
        </IconBtnLayout>
      </div>
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  padding: 22px 0;
  margin-bottom: 20px;
  justify-content: space-around;
  background: #fff;
  box-shadow: 4px 0 6px rgba(0, 0, 0, 0.4);
`;

const SearchLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 400px;
  margin-left: 30px;
  border: 2px solid #21bf48;
  border-radius: 50px;
  padding: 13px 22px;
  box-sizing: border-box;
`;

const SearchInput = styled.input`
  &::placeholder {
    color: #767676;
  }
`;

const SearchBtn = styled.button`
  width: 28px;
  height: 28px;
  background: url(${search}) no-repeat center;
`;

const IconBtnLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  &:nth-child(2) {
    margin: 0 47px;
  }
  /* &:last-child {
    margin-left: 47px;
  } */
`;
const IconBtn = styled.button`
  width: 32px;
  height: 32px;
  background: url(${(props) => props.$bg}) no-repeat center;
`;
export default BasicHeader;
