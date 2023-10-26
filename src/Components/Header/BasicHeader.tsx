import { styled } from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../Assets/Icons/mulkong.svg";
import search from "../../Assets/Icons/search.svg";
import cart from "../../Assets/Icons/shopping-cart.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import userToken from "../../Recoil/userToken/userToken";
import apiCartItems from "Recoil/cart/apiCartItems";

interface IconBtnLayoutType {
  $position?: string;
}
interface IconBtnType {
  $bg: string;
}
const BasicHeader = () => {
  const navigate = useNavigate();
  const setToken = useSetRecoilState(userToken);
  const apiCart = useRecoilValue(apiCartItems);
  const cartProductNumber = apiCart.length;

  const handleLogout = () => {
    const isLogOut = window.confirm("로그아웃 하시겠습니까?");
  
    if (isLogOut) {
      setToken("");
      navigate("/");
      localStorage.removeItem("kakaoToken");
    } else return;
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
            $position="relative"
          >
            <IconBtn $bg={cart} />
            <span>장바구니</span>
            <AlertCart>{cartProductNumber}</AlertCart>
          </IconBtnLayout>
        </Link>
        {/* <IconBtnLayout>
          <IconBtn $bg={user} />
          <span>마이페이지</span>
        </IconBtnLayout> */}
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
  z-index: 9;
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
  border: 2px solid var(--primary);
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

const IconBtnLayout = styled.div<IconBtnLayoutType>`
  display: flex;
  position: ${(props) => props.$position};
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
const IconBtn = styled.button<IconBtnType>`
  width: 32px;
  height: 32px;
  background: url(${(props) => props.$bg}) no-repeat center;
`;

const AlertCart = styled.div`
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  top: -3px;
  right: 5px;
  color: white;
  text-align: center;
  line-height: 20px;
`;
export default BasicHeader;
