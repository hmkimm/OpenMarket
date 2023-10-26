import Button from "./Common/Button";
import kakao from "../Assets/Icons/kakao_login_medium.png";

const SocialKakao = () => {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };
  return (
    <>
      <Button
        onClick={handleLogin}
        $br="15px"
        width="50%"
        $height="60px"
        $padding="0"
        $margin="10px 0 0 0"
        style={{ backgroundColor: "#FEE500" }}
      >
        {/* <img src={kak} width='130px' height='60px' /> */}
        <img src={kakao} />
      </Button>
    </>
  );
};
export default SocialKakao;
