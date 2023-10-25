import notfound from "../Assets/Icons/404.svg";
import styled from "styled-components";
import Button from "Components/Common/Button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <h1 className="a11y-hidden">Not Found</h1>

      <div>
        <Image src={notfound} alt="404 이미지" />
        <Text>페이지를 찾을 수 없습니다 :&#40;</Text>
        <Button
          width="100px"
          $fontsize="13px"
          onClick={() => navigate(-1)}
          $margin="0 auto"
        >
          이전 페이지
        </Button>
      </div>
    </Layout>
  );
};

const Layout = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  display: block;
  width: 300px;
  margin: 0 auto;
`;

const Text = styled.div`
  font-size: 18px;
  text-align: center;
  margin: 60px 0;
`;
export default NotFound;
