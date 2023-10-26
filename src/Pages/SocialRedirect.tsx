import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "Components/Loading";

const SocialRedirect = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    //인가코드 백엔드로 보내기
    const fetchData = async () => {
      try {
        const formData = new URLSearchParams();

        formData.append("grant_type", "authorization_code");
        formData.append(
          "client_id",
          process.env.REACT_APP_REST_API_KEY as string
        );
        formData.append(
          "redirect_uri",
          process.env.REACT_APP_REDIRECT_URI as string
        );
        formData.append("code", code as string);

        const response = await fetch("https://kauth.kakao.com/oauth/token", {
          method: "POST",
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);

        localStorage.setItem("kakaoToken", data.access_token);

        navigate("/buyermain");
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Loading />
    </>
  );
};

export default SocialRedirect;
