import URL from "./URL";
import { userInput } from "Pages/LogIn";

const LogInAPI = async (userInput: userInput) => {
  try {
    const res = await fetch(`${URL}/accounts/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInput),
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      return data;
    } else {
      throw new Error("id, pw가 일치하지 않습니다.");
    }
    // };
  } catch (error) {
    console.error("login api 응답 오류", error);
    throw error;
  }
};

export default LogInAPI;
