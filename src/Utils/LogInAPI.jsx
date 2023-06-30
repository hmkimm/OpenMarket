import { useState } from "react";
import URL from "./URL";

const LogInAPI = () => {
  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
    login_type: "", // BUYER : 일반 구매자, SELLER : 판매자
  });
  try {
    const handleLogIn = async () => {
      const res = await fetch(`${URL}/accounts/login`, {
        method: "POST",
        body: JSON.stringify(userInput),
      });
      const data = await res.json();
      if (res.ok) {
        return data;
      } else {
        throw new Error("id, pw가 일치하지 않습니다.");
      }
    };
  } catch (error) {
    console.error("login api 응답 오류", error);
  }
};

export default LogInAPI;
