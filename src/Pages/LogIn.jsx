import { React, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import logo from "../Assets/Icons/Logo-hodu.svg";
import Button from "../Components/Common/Button";
import userToken from "../Recoil/userToken/userToken";

import LogInAPI from "../Utils/LogInAPI";

const LogIn = () => {
  const navigate = useNavigate();
  const [selectedBtn, setSelectedBtn] = useState(null);
  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
    login_type: "", // BUYER : 일반 구매자, SELLER : 판매자
  });
  const [token, setToken] = useRecoilState(userToken);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setUserInput((prevState) => ({
      ...prevState, //note: 이렇게 하면 기존 상태 값은 유지되고 변경된 값만 새로운 상태 객체에서 업데이트하게 됩니다.
      [name]: value, //note: 계산된 속성명(Computed Property Name) 문법
    }));
  };
  const handleLogIn = async (e) => {
    console.log("handlelogin 호출");
    e.preventDefault();
    const res = await LogInAPI(userInput); //note:함수에 객체를 인자로 직접 넣으면 {}필요없음
    setToken(res.token);

    if (userInput.login_type === "SELLER") {
      navigate("/sellermain");
    } else {
      navigate("/buyermain");
    }
  };
  const handleBtn = (btnValue) => {
    setSelectedBtn(btnValue);
  };

  return (
    <div>
      <img
        src={logo}
        style={{ display: "block", margin: "100px auto 70px", width: "238px" }}
        alt="hodu-market"
      />
      <FormLayout onSubmit={handleLogIn}>
        <LogInButtonLayout>
          <LogInButton
            name="login_type"
            value="BUYER"
            onClick={(e) => {
              handleInputChange(e);
              handleBtn("BUYER");
            }}
            $isSelected={selectedBtn === "BUYER"}
          >
            구매회원 로그인
          </LogInButton>
          <LogInButton
            name="login_type"
            value="SELLER"
            onClick={(e) => {
              handleInputChange(e);
              handleBtn("SELLER");
            }}
            $isSelected={selectedBtn === "SELLER"}
          >
            판매회원 로그인
          </LogInButton>
          {/* //note: 스타일드 컴포넌트가 $ 기호로 시작하는 속성은 DOM에 전달하는 것을 피함 */}
        </LogInButtonLayout>
        <Input
          name="username"
          value={userInput.username}
          placeholder="아이디"
          onChange={handleInputChange}
        />
        <Input
          name="password"
          value={userInput.password}
          placeholder="비밀번호"
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          onClick={() => {
            console.log(33333);
          }}
        >
          로그인
        </Button>
      </FormLayout>
      <LinkLayout>
        <Link to="/">회원가입 </Link>
        <Link to="/">ㅣ 비밀번호 찾기</Link>
      </LinkLayout>
    </div>
  );
};

const FormLayout = styled.form`
  margin: 0 auto;
  width: 550px;
  height: 352px;
  border: 1px solid #c4c4c4;
  padding: 0 35px 36px 35px;
  border-radius: 10px;
  border-top: none;
`;

const LogInButtonLayout = styled.div`
  display: flex;
  margin: 0 -35px;
`;
const LogInButton = styled.button.attrs({
  type: "button",
})`
  width: 50%;
  height: 60px;
  font-size: 18px;
  border-radius: 10px;
  border: 1px solid #c4c4c4;
  background-color: ${(props) => (props.$isSelected ? "#F2F2F2" : "")};
`;

const Input = styled.input`
  &::placeholder {
    color: #767676;
    font-size: 16px;
  }
  border-bottom: 1px solid #c4c4c4;
  width: ${(props) => props.width || "100%"};
  padding: ${(props) => props.padding || "20px 0"};
  margin: ${(props) => props.margin || "34px 0 0 0 "};
`;

const LinkLayout = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  color: var(--gray-1, #333);
`;

export default LogIn;
