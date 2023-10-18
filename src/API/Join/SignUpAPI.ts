import URL from "API/URL";
import { RegisterInputsType } from "Pages/BuyerJoin";

const SignUpAPI = (registerInputs: RegisterInputsType) => {
  const handleSignUp = async () => {
    const res = await fetch(`${URL}/accounts/signup/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerInputs),
    });

    const data = await res.json();
    console.log(data);
  };
  return handleSignUp;
};

export default SignUpAPI;
