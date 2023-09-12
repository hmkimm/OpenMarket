import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import logo from "../Assets/Icons/Logo-hodu.svg";
import Button from "../Components/Common/Button";
import userToken from "../Recoil/userToken/userToken";
import ErrorMsg from "../Components/Common/ErrorMsg";

import LogInAPI from "../Utils/LogInAPI";

interface userInput {
  username: string;
  password: string;
  login_type: "BUYER" | "SELLER" | "";
}
interface LogInButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  br?: string;
  borLeft?: string;
  borRight?: string;
  $isSelected: boolean;
  name: string;
  value: string;
}
interface Input extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: string;
  padding?: string;
  margin?: string;
}

const LogIn = () => {
  const navigate = useNavigate();
  const [selectedBtn, setSelectedBtn] = useState<"BUYER" | "SELLER" | null>(
    null
  );
  const [userInput, setUserInput] = useState<userInput>({
    username: "",
    password: "",
    login_type: "", // BUYER : 일반 구매자, SELLER : 판매자
  });
  const [token, setToken] = useRecoilState<string>(userToken);
  const [errMsg, setErrMsg] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setUserInput((prevState) => ({
      ...prevState, //note: 이렇게 하면 기존 상태 값은 유지되고 변경된 값만 새로운 상태 객체에서 업데이트하게 됩니다.
      [name]: value, //note: 계산된 속성명(Computed Property Name) 문법
    }));
  };
  const handleLogIn = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userInput.username && !userInput.password) {
      setErrMsg("아이디를 입력해주세요.");
    } else if (!userInput.username) {
      setErrMsg("아이디를 입력해주세요.");
    } else if (!userInput.password) {
      setErrMsg("비밀번호를 입력해주세요.");
    } else {
      try {
        const res = await LogInAPI(userInput); //note:함수에 객체를 인자로 직접 넣으면 {}필요없음
        setToken(res.token);

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
          login_type: "", // BUYER : 일반 구매자, SELLER : 판매자
        });
        if (inputRef.current) inputRef.current.focus();
      }
    }
  };
  const handleBtnChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name, value } = e.currentTarget;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleBtn = (btnValue: "BUYER" | "SELLER") => {
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
            br="10px 10px 0 0 "
            borLeft="none"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              handleBtn("BUYER");
              handleBtnChange(e);
            }}
            // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            //   handleInputChange(e);
            // }}
            $isSelected={selectedBtn === "BUYER"}
          >
            구매회원 로그인
          </LogInButton>
          <LogInButton
            name="login_type"
            value="SELLER"
            br="10px 10px 0 0 "
            borRight="none"
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
        {errMsg === "비밀번호를 입력해주세요." && <ErrorMsg>{errMsg}</ErrorMsg>}
        {errMsg === "아이디 또는 비밀번호가 일치하지 않습니다." && (
          <ErrorMsg>{errMsg}</ErrorMsg>
        )}
        <Button
          empty={
            !userInput.login_type || !userInput.username || !userInput.password
          }
          type="submit"
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
  /* height: 352px; */
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
  border-radius: ${(props) => props.br || "10px"};
  border: 1px solid #c4c4c4;
  color: ${(props) => (props.$isSelected ? "white" : "black")};
  border-bottom: transparent;
  background-color: ${(props) => (props.$isSelected ? "var(--primary)" : "")};
  border-left: ${(props) => props.borLeft};
  border-right: ${(props) => props.borRight};
`;

const Input = styled.input<Input>`
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
