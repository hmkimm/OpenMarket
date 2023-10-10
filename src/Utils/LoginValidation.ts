import { useState } from "react";

export const LoginValidation = () => {
  const [isValid, setIsValid] = useState<boolean>(false);

  const pwValidation = (pw: string, confirmPw: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    console.log('결과', passwordRegex.test(pw));
    // //fixme: 정규식 검사 결과가 바로 반영 안됨.

    if (!passwordRegex.test(pw)) {
      const errMsg = "8자 이상, 영문 대 소문자, 숫자, 특수문자를 사용하세요.";
      return errMsg;
    }


    if (pw !== confirmPw) {
      const errMsg = "비밀번호가 일치하지 않습니다.";
      return errMsg;
    }
  };
  return { pwValidation };
};
