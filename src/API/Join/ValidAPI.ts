import URL from "API/URL";

import { RegisterInputsType, DataType } from "Pages/BuyerJoin";

const ValidAPI = (
  registerInputs: RegisterInputsType,
  updateMsg: (data: DataType) => void
) => {
  const isValid = async () => {
    try {
      const res = await fetch(`${URL}/accounts/signup/valid/username/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerInputs),
      });
      console.log(registerInputs);
      // if (!res.ok) {
      //   throw new Error("");
      // }
      const data = await res.json();
      console.log(data);

      updateMsg(data);
      return data;
    } catch (error) {
      console.error(error, "api error");
    }
  };
  return isValid;
};

export default ValidAPI;
