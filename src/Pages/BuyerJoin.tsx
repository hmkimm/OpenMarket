import React, { useState, ChangeEvent, useEffect } from "react";
import logo from "../Assets/Icons/mulkong.svg";
import styled from "styled-components";
import ErrorMsg from "Components/Common/ErrorMsg";
import Button from "Components/Common/Button";
import Input from "Components/Input";
import { LoginValidation } from "../Utils/LoginValidation";
import SignUpAPI from "API/Join/SignUpAPI";
import MetaTag from "Components/Common/MetaTag";

import { userInput, LogInButtonProps } from "./LogIn";
import FlexLayout from "Style/FlexLayout";
import ValidAPI from "API/Join/ValidAPI";
import { Link } from "react-router-dom";

export interface RegisterInputsType {
  username: string;
  password: string;
  password2: string;
  phone_number: string | "";
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

  const [isChecked, setIsChecked] = useState(false);
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

  const { pwValidation, idValidation, phoneNumValidation } = LoginValidation();
  const handleSignUp = SignUpAPI(registerInputs);
  const [errMsg, setErrMsg] = useState<string>("");
  const [userInput, setUserInput] = useState<userInput>({
    username: "",
    password: "",
    login_type: undefined, // BUYER : 일반 구매자, SELLER : 판매자
  });

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setErrMsg("");

    if (name === "username") {
      const checkId = e.target.value;
      const idValidationResult = idValidation(checkId);

      if (idValidationResult) {
        setErrMsg("20자 이내의 영문 대소문자 숫자만 가능합니다.");
      }
    }

    //note: onchange는 바뀌고 나서 상태가 업데이트 되기 때문에 바로 바로 동작하기가 어려움. 따라서 e.target.value로 직접 지정해야 업데이트를 바로 할 수 있음. registerInputs.username처럼 상태가 업데이트 되야하는건 바로 업데이트가 안된다.

    setRegisterInputs((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (!userInput.login_type) {
      setErrMsg("회원 타입을 설정해주세요");
    }
  };

  const handleBlur = () => {
    const pwValidationResult = pwValidation(
      registerInputs.password,
      registerInputs.password2
    );
    console.log("함수 결과 : ", pwValidationResult);
    console.log("에러 메세지 : ", errMsg);

    if (
      pwValidationResult ===
      "8자 이상, 영문 대 소문자, 숫자, 특수문자를 사용하세요."
    ) {
      setErrMsg(pwValidationResult);
    }

    if (
      registerInputs.password2 &&
      pwValidationResult === "비밀번호가 일치하지 않습니다."
    ) {
      setErrMsg(pwValidationResult);
    }
  };

  useEffect(() => {
    console.log("errMsg 업데이트:", errMsg);
  }, [errMsg]);

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

  const handleUserNameValid = () => {
    isValid();
  };

  const handlePhoneNum = (e: ChangeEvent<HTMLInputElement>) => {
    setErrMsg("");
    const { name, value } = e.target;

    const formattedPhoneNumber = phoneNumValidation(e.target.value);

    setRegisterInputs((prev) => ({
      ...prev,
      [name]: value,
      phone_number: formattedPhoneNumber,
    }));

    const regexNum = /^010-?([0-9]{3,4})-?([0-9]{4})$/;

    if (!regexNum.test(formattedPhoneNumber)) {
      setErrMsg("올바른 형식을 입력해주세요");
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setIsChecked(checked);
  };

  const handleSubmit = () => {
    handleSignUp();
  };
  console.log("판매유형 : ", userInput.login_type);

  return (
    <>
      <MetaTag
        title='Mulkong 마켓 회원가입'
        description='Mulkong 마켓에 회원가입 하고 다양한 사람들의 물품을 거래해보세요'
        imageUrl="https://i.ibb.co/fNSQzNm/Group-2.png"
        url='https://d1aj463p8fjhgr.cloudfront.net/buyerjoin'
      />
      <Link to="/">
        <img
          src={logo}
          style={{
            display: "block",
            margin: "100px auto 70px",
            width: "400px",
          }}
          alt="hodu-market"
        />
      </Link>

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
            value={registerInputs?.username}
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
        {errMsg === "20자 이내의 영문 대소문자 숫자만 가능합니다." && (
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
          onBlur={handleBlur}
        />
        {errMsg ===
          "8자 이상, 영문 대 소문자, 숫자, 특수문자를 사용하세요." && (
          <ErrorMsg>{errMsg}</ErrorMsg>
        )}
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
          onBlur={handleBlur}
        />
        {errMsg === "비밀번호가 일치하지 않습니다." && (
          <ErrorMsg>{errMsg}</ErrorMsg>
        )}
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
          maxLength={13}
          onChange={handlePhoneNum}
        />
        {errMsg === "올바른 형식을 입력해주세요" && (
          <ErrorMsg>{errMsg}</ErrorMsg>
        )}

        {errMsg === "로그인을 해주세요!" && <ErrorMsg>{errMsg}</ErrorMsg>}
        {errMsg === "회원 타입을 설정해주세요" && <ErrorMsg>{errMsg}</ErrorMsg>}
        {errMsg === "비밀번호를 입력해주세요." && <ErrorMsg>{errMsg}</ErrorMsg>}
        {errMsg === "아이디 또는 비밀번호가 일치하지 않습니다." && (
          <ErrorMsg>{errMsg}</ErrorMsg>
        )}
        <input type="checkbox" id="info" style={{ marginRight: "10px" }}
          checked={isChecked}
          onChange={handleCheckboxChange} />
        <label htmlFor="info">
          호두샵의 이용약관 및 개인정보처리방침에 대한 내용을 확인하였고
          동의합니다.
        </label>
      </FormLayout>

      <Button
        disabled={userInput.login_type===undefined || !isChecked }
        type="submit"
        width="620px"
        $margin="30px auto"
        onClick={handleSubmit}
      >
        가입하기
      </Button>
    </>
  );
};

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

export default BuyerJoin;
