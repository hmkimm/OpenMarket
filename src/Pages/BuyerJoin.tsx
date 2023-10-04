import React, { useState, useRef } from "react";
import logo from "../Assets/Icons/mulkong.svg";
import styled from "styled-components";
import ErrorMsg from "Components/Common/ErrorMsg";
import Button from "Components/Common/Button";
import Input from "Components/Input";

import { userInput, LogInButtonProps, InputType } from "./LogIn";
import FlexLayout from "Style/FlexLayout";
import { Layout } from "Style/Layout";
import ValidAPI from "API/Join/ValidAPI";

export interface RegisterInputsType {
  username: string;
  password: string;
  password2: string;
  phone_number: number | "";
  name: string;
}

export interface DataType {
  Success?: string;
  FAIL_Message?: string;
}

const BuyerJoin = () => {
  const [selectedBtn, setSelectedBtn] = useState<"BUYER" | "SELLER" | null>(
    null
  );
  const [registerInputs, setRegisterInputs] = useState<RegisterInputsType>({
    username: "",
    password: "",
    password2: "",
    phone_number: "",
    name: "",
  });
  const updateMsg = (data: DataType) => {
    console.log(data);
    setErrMsg(data.Success! || data.FAIL_Message!);
  };
  const isValid = ValidAPI(registerInputs, updateMsg);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [errMsg, setErrMsg] = useState<string>("");
  const [userInput, setUserInput] = useState<userInput>({
    username: "",
    password: "",
    login_type: undefined, // BUYER : 일반 구매자, SELLER : 판매자
  });

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setRegisterInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrMsg("");

    if (!userInput.login_type) {
      setErrMsg("회원 타입을 설정해주세요");
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

  const handleUserNameValid = async () => {
    const res = await isValid();
    // return res;
  };
  console.log(registerInputs);
  return (
    <>
      <div>
        <img
          src={logo}
          style={{
            display: "block",
            margin: "100px auto 70px",
            width: "400px",
          }}
          alt="hodu-market"
        />
      </div>

      <FormLayout>
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
            구매회원가입
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
            판매회원가입
          </LogInButton>
        </LogInButtonLayout>
        <FlexLayout $jc="space-between" $gap="40px">
          <Input
            name="username"
            value={registerInputs.username}
            label="아이디"
            display="block"
            width="360px"
            height="50px"
            $mb="10px"
            $margin="0 0 20px 0"
            id="id"
            onChange={handleInputChange}
          />
          <Button
            $margin="5px 0 0 0"
            $height="50px"
            $padding="0"
            $fontsize="15px"
            onClick={handleUserNameValid}
            type="button"
          >
            중복확인
          </Button>
        </FlexLayout>

        {errMsg === "멋진 아이디네요 :)" && (
          <ErrorMsg $color="var(--primary)" $margin="0 0 17px 0">
            {errMsg}
          </ErrorMsg>
        )}
        {(errMsg === "username 필드를 추가해주세요 :)" ||
          errMsg === "이미 사용 중인 아이디입니다.") && (
          <ErrorMsg $margin="0 0 17px 0">{errMsg}</ErrorMsg>
        )}
        <Input
          name="password"
          value={registerInputs.password}
          label="비밀번호"
          display="block"
          width="100%"
          height="50px"
          $mb="10px"
          $margin="0 0 20px 0"
          id="pw"
          onChange={handleInputChange}
        />
        <Input
          name="password2"
          value={registerInputs.password2}
          label="비밀번호 재확인"
          display="block"
          $labelwidth="100%"
          width="100%"
          height="50px"
          $mb="10px"
          $margin="0 0 20px 0"
          id="pw-confirm"
          onChange={handleInputChange}
        />
        <Input
          name="name"
          value={registerInputs.name}
          label="이름"
          display="block"
          width="100%"
          height="50px"
          $mb="10px"
          $margin="0 0 20px 0"
          id="name"
          onChange={handleInputChange}
        />
        <Input
          name="phone_number"
          value={registerInputs.phone_number!}
          label="휴대폰 번호"
          display="block"
          width="100%"
          height="50px"
          $mb="10px"
          $margin="0 0 20px 0"
          id="phone"
          onChange={handleInputChange}
        />
        {errMsg === "아이디를 입력해주세요." && <ErrorMsg>{errMsg}</ErrorMsg>}

        {errMsg === "로그인을 해주세요!" && <ErrorMsg>{errMsg}</ErrorMsg>}
        {errMsg === "회원 타입을 설정해주세요" && <ErrorMsg>{errMsg}</ErrorMsg>}
        {errMsg === "비밀번호를 입력해주세요." && <ErrorMsg>{errMsg}</ErrorMsg>}
        {errMsg === "아이디 또는 비밀번호가 일치하지 않습니다." && (
          <ErrorMsg>{errMsg}</ErrorMsg>
        )}
        <input type="checkbox" id="info" style={{ marginRight: "10px" }} />
        <label htmlFor="info">
          호두샵의 이용약관 및 개인정보처리방침에 대한 내용을 확인하였고
          동의합니다.
        </label>
      </FormLayout>

      <Button
        disabled={
          !userInput.login_type || !userInput.username || !userInput.password
        }
        type="submit"
        width="480px"
        $margin="30px auto"
      >
        가입하기
      </Button>
    </>
  );
};
const JoinLayout = styled(Layout)`
  padding-top: 160px;
  padding-bottom: 80px;
`;
const FormLayout = styled.form`
  margin: 0 auto;
  width: 550px;
  border: 1px solid #c4c4c4;
  border: 1px solid var(--primary);
  padding: 0 35px 36px 35px;
  border-radius: 10px;
  border-top: none;
`;

const LogInButtonLayout = styled.div`
  display: flex;
  margin: 0 -35px;
  margin-bottom: 30px;
`;
const LogInButton = styled.button.attrs({
  type: "button",
})<LogInButtonProps>`
  width: 50%;
  height: 60px;
  font-size: 18px;
  border-radius: ${(props) => props.$br || "10px"};
  border: 1px solid var(--primary);
  color: ${(props) => (props.$isSelected ? "white" : "black")};
  border-bottom: transparent;
  background-color: ${(props) => (props.$isSelected ? "var(--primary)" : "")};
  border-left: ${(props) => props.$borLeft};
  border-right: ${(props) => props.$borRight};
`;

// const LoginInput = styled.input<InputType>`
//   &::placeholder {
//     color: #767676;
//     font-size: 16px;
//   }
//   border-bottom: 1px solid #c4c4c4;
//   width: ${(props) => props.width || "100%"};
//   padding: ${(props) => props.padding || "20px 0"};
//   margin: ${(props) => props.margin || "34px 0 0 0 "};
// `;

export default BuyerJoin;
