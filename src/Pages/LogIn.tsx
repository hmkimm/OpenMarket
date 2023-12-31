import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { useCookies } from "react-cookie";

import logo from "../Assets/Icons/mulkong.svg";
import Button from "../Components/Common/Button";
import userToken from "../Recoil/userToken/userToken";
import ErrorMsg from "../Components/Common/ErrorMsg";
import MetaTag from "Components/Common/MetaTag";

import LogInAPI from "../API/LogInAPI";
import AlertBox from "Components/AlertBox";
import FlexLayout from "Style/FlexLayout";

export interface userInput {
  username: string;
  password: string;
  login_type: "BUYER" | "SELLER" | undefined;
}
export interface LogInButtonProps {
  $br?: string;
  $borLeft?: string;
  $borRight?: string;
  $isSelected: boolean;
  name: string;
  value: string;
}
export interface InputType {
  width?: string;
  padding?: string;
  margin?: string;
}

const LogIn = () => {
  const [cookies, setCookies] = useCookies(["loginToken"]);
  const navigate = useNavigate();
  const location = useLocation();
  const [isWrongRoute, setIsWrongRoute] = useState(true);
  const [selectedBtn, setSelectedBtn] = useState<"BUYER" | "SELLER" | null>(
    null
  );
  const [userInput, setUserInput] = useState<userInput>({
    username: "",
    password: "",
    login_type: undefined, // BUYER : 일반 구매자, SELLER : 판매자
  });
  const setToken = useSetRecoilState(userToken);
  const [errMsg, setErrMsg] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrMsg("");

    if (!userInput.login_type) {
      setErrMsg("회원 타입을 설정해주세요");
    }
  };

  const handleLogIn = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrMsg("");

    try {
      const res = await LogInAPI(userInput);
      setToken(res.token);
      setCookies("loginToken", res.token, {
        path: "/",
        secure: true,
        httpOnly: true,
      });

      if (userInput.login_type === "SELLER") {
        navigate("/sellermain");
      } else {
        navigate("/buyermain");
      }
    } catch (error) {
      setErrMsg("아이디 또는 비밀번호가 일치하지 않습니다.");
      setUserInput({
        username: "",
        password: "",
        login_type: undefined, // BUYER : 일반 구매자, SELLER : 판매자
      });
      setSelectedBtn(null);
      if (inputRef.current) inputRef.current.focus();
    }
  };

  const handleBtnChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    setErrMsg("");
    const { name, value } = e.currentTarget;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleBtn = (btnValue: "BUYER" | "SELLER" | null) => {
    setSelectedBtn(btnValue);
  };

  useEffect(() => {
    if (location.state) {
      setTimeout(() => {
        setIsWrongRoute(false);
      }, 1500);
    }
    console.log("rendering");
  }, [location.state]);

  return (
    <>
      <MetaTag
        title="Mulkong 마켓 로그인"
        description="Mulkong 마켓에 로그인 하고 다양한 물품을 거래해보세요"
        imageUrl="https://blog.kakaocdn.net/dn/bpi5dp/btsyH1TCRFJ/M6XUKoY6A48ikwOSDkEAnK/img.png"
        url="https://d1aj463p8fjhgr.cloudfront.net/"
      />
      <img
        src={logo}
        style={{ display: "block", margin: "100px auto 70px", width: "400px" }}
        alt="hodu-market"
      />
      <FormLayout onSubmit={handleLogIn}>
        <LogInButtonLayout>
          <LogInButton
            name="login_type"
            value="BUYER"
            $br="10px 10px 0 0 "
            $borLeft="none"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              handleBtn("BUYER");
              handleBtnChange(e);
            }}
            $isSelected={selectedBtn === "BUYER"}
          >
            구매회원 로그인
          </LogInButton>
          <LogInButton
            name="login_type"
            value="SELLER"
            $br="10px 10px 0 0 "
            $borRight="none"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              handleBtn("SELLER");
              handleBtnChange(e);
            }}
            $isSelected={selectedBtn === "SELLER"}
          >
            판매회원 로그인
          </LogInButton>
        </LogInButtonLayout>
        <Input
          name="username"
          value={userInput.username}
          placeholder="아이디"
          onChange={handleInputChange}
          ref={inputRef}
        />
        {errMsg === "아이디를 입력해주세요." && <ErrorMsg>{errMsg}</ErrorMsg>}
        <Input
          name="password"
          type="password"
          value={userInput.password}
          placeholder="비밀번호"
          onChange={handleInputChange}
        />
        {errMsg === "로그인을 해주세요!" && <ErrorMsg>{errMsg}</ErrorMsg>}
        {errMsg === "회원 타입을 설정해주세요" && <ErrorMsg>{errMsg}</ErrorMsg>}
        {errMsg === "비밀번호를 입력해주세요." && <ErrorMsg>{errMsg}</ErrorMsg>}
        {errMsg === "아이디 또는 비밀번호가 일치하지 않습니다." && (
          <ErrorMsg>{errMsg}</ErrorMsg>
        )}
        <FlexLayout $margin="10px 0">
          <Button
            disabled={
              !userInput.login_type ||
              !userInput.username ||
              !userInput.password
            }
            type="submit"
            $margin="20px 0 0 0"
            width="65%"
            $br="15px"
            $fontsize="16px"
            style={{
              backgroundColor: "transparent",
              border: "1px solid var(--primary)",
              color: "var(--primary)",
            }}
          >
            아이디 로그인
          </Button>
        </FlexLayout>
      </FormLayout>
      <LinkLayout>
        <Link to="/buyerjoin">회원가입 </Link>
        <Link to="/">ㅣ 비밀번호 찾기</Link>
      </LinkLayout>
      {location.state && isWrongRoute && (
        <AlertBox transY="-110%">{location.state}</AlertBox>
      )}
    </>
  );
};

const FormLayout = styled.form`
  margin: 0 auto;
  width: 550px;
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
})<LogInButtonProps>`
  width: 50%;
  height: 60px;
  font-size: 18px;
  border-radius: ${(props) => props.$br || "10px"};
  border: 1px solid #c4c4c4;
  color: ${(props) => (props.$isSelected ? "white" : "black")};
  border-bottom: transparent;
  background-color: ${(props) => (props.$isSelected ? "var(--primary)" : "")};
  border-left: ${(props) => props.$borLeft};
  border-right: ${(props) => props.$borRight};
`;

const Input = styled.input<InputType>`
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
