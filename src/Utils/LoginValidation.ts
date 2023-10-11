
export const LoginValidation = () => {
  const idValidation = (id: string) => {
    const IdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{1,20}$/;

    const regexResult = IdRegex.test(id);
    console.log("id 검사 : ", regexResult);


    if(!regexResult) {
      const errMsg = "20자 이내의 영문 대소문자 숫자만 가능합니다.";
      return errMsg;
    }
  };

  const pwValidation = (pw: string, confirmPw: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const isPasswordValid = passwordRegex.test(pw);

    console.log("결과", isPasswordValid);

    if (!isPasswordValid) {
      const errMsg = "8자 이상, 영문 대 소문자, 숫자, 특수문자를 사용하세요.";
      return errMsg;
    }

    if (pw !== confirmPw) {
      const errMsg = "비밀번호가 일치하지 않습니다.";
      return errMsg;
    }
  };

  return { pwValidation, idValidation };
};
