import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userToken from "Recoil/userToken/userToken";

const ProtectedRoute = () => {
  const isLogIn = useRecoilValue(userToken);
  const navigate = useNavigate();
  console.log(isLogIn);
  const ErrMsg = "로그인을 해주세요!";

  const removeAlertBox = () => {};
  useEffect(() => {
    if (!isLogIn) {
      navigate("/", { state: ErrMsg });
    }
  }, []);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
