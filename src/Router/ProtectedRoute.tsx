import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userToken from "Recoil/userToken/userToken";

const ProtectedRoute = () => {
  const isLogIn =
    useRecoilValue(userToken) || localStorage.getItem("kakaoToken");

  const navigate = useNavigate();
  const ErrMsg = "로그인을 해주세요!";

  useEffect(() => {
    if (!isLogIn) {
      navigate("/", { state: ErrMsg });
    }
  }, [isLogIn, navigate]);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
