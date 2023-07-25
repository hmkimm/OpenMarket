import React from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

import logo from "../../Assets/Icons/Logo-hodu.svg";
import search from "../../Assets/Icons/search.svg";
import cart from "../../Assets/Icons/shopping-cart.svg";
import user from "../../Assets/Icons/icon-user.svg";

const BasicHeader = () => {
  return (
    <Layout>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={logo}
          alt="hodu-market"
          style={{ width: "124px", height: "38px" }}
        />
        <SearchLayout>
          <SearchInput placeholder="상품을 검색해보세요!" />
          <SearchBtn />
        </SearchLayout>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <IconBtnLayout>
          <IconBtn $bg={cart} />
          <span>장바구니</span>
        </IconBtnLayout>
        <IconBtnLayout>
          <IconBtn $bg={user} />
          <span>마이페이지</span>
        </IconBtnLayout>
      </div>
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  padding: 22px 0;
  justify-content: space-around;
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

const IconBtnLayout = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  &:last-child {
    margin-left: 47px;
  }
`;
const IconBtn = styled.button`
  width: 32px;
  height: 32px;
  background: url(${(props) => props.$bg}) no-repeat center;
`;
export default BasicHeader;
