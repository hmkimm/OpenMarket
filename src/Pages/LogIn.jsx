import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import logo from "../Assets/Icons/Logo-hodu.svg";

export default function LogIn() {
  return (
    <div>
      <img
        src={logo}
        style={{ display: "block", margin: "100px auto 70px" }}
        alt="hodu-market"
      />
      <FormLayout>
        <Button>구매회원 로그인</Button>
        <Button>판매회원 로그인</Button>
        <Input placeholder="아이디" />
        <Input placeholder="비밀번호" />
      </FormLayout>
      <LinkLayout>
        <Link to="/" style={{ color: "#333333" }}>
          회원가입{" "}
        </Link>
        <Link to="/">ㅣ 비밀번호 찾기</Link>
      </LinkLayout>
    </div>
  );
}

const FormLayout = styled.form`
  margin: 0 auto;
  width: 550px;
  height: 352px;
  border: 1px solid #c4c4c4;
  padding: 0 35px 35px 35px;
  border-radius: 10px;
`;

const Button = styled.button`
  width: 275px;
  height: 60px;
`;

const Input = styled.input`
  &::placeholder {
    color: #767676;
    font-size: 16px;
  }
  border-bottom: 1px solid #c4c4c4;
  width: ${(props) => props.width || "100%"};
  padding: ${(props) => props.padding || "20px 0"};
`;

const LinkLayout = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;
