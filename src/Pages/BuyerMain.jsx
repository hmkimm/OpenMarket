import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";

import ProductAPI from "../Utils/ProductAPI";

import BasicHeader from "../Components/Header/BasicHeader";
import insta from "../Assets/Icons/insta.svg";
import fb from "../Assets/Icons/fb.svg";
import yt from "../Assets/Icons/yt.svg";
import ProductItem from "../Components/Common/ProductItem";
import userToken from "../Recoil/userToken/userToken";

const BuyerMain = () => {
  const token = useRecoilValue(userToken);

  const [productList, setProductList] = useState({});
  // const data = ProductAPI();
  // console.log(data);
  //memo: 위 코드에서 문제가 되는 부분은 ProductAPI 함수를 동기식으로 호출하려고 시도한다는 것입니다. 그러나 ProductAPI 함수는 async 로 선언되어 있기 때문에 이를 동기식으로 호출할 수 없습니다. 해당 함수를 호출하면 즉시 Promise 객체가 반환되며, 실제 데이터는 아직 반환되지 않습니다. 이를 해결하려면, ProductAPI 함수를 비동기적으로 호출하는 코드를 사용해야 합니다. 그래서 useEffect를 사용하여 이를 처리하는 것이 좋습니다. useEffect 내에서 async-await를 사용하여 함수를 호출하면 적절한 시점에 상태를 업데이트할 수 있습니다.
  useEffect(() => {
    const getProduct = async () => {
      const { fetchproducts } = ProductAPI(token);
      //memo: 이 객체의 속성이 fetchproducts 함수이고, 이 함수를 반환된 객체에서 추출하여 사용하려면 객체 구조 분해 할당을 사용해야 합니다.
      // 따라서, const { fetchproducts } = ProductAPI(token); 코드는 ProductAPI 함수로부터 반환된 객체에서 fetchproducts 속성을 추출하여 fetchproducts라는 상수에 할당하는 것입니다. 객체 구조 분해 할당은 반환된 객체에서 변수 이름과 일치하는 속성을 찾고, 해당 속성에 할당된 값을 변수에 할당
      const res = await fetchproducts();
      setProductList(res);
    };
    getProduct();
  }, []);
  console.log(productList.results);
  return (
    <div>
      <BasicHeader />
      <Grid>
        {productList.results?.map((item, i) => {
          return (
            <ProductItem
              key={i}
              seller={item.store_name}
              name={item.product_name}
              // price={item.price?.toLocalString()}
              price={item.price ? item.price.toLocaleString() : ""}
              img={item.image}
            />
          );
        })}
      </Grid>

      <Footer>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <Links>
            <div>
              <a href="#">호두샵 소개 ㅣ </a>
              <a href="#">이용약관 ㅣ </a>
              <a href="#">개인정보처리방침 ㅣ </a>
              <a href="#">전자금융거래약관 ㅣ </a>
              <a href="#">청소년보호정책 ㅣ </a>
              <a href="#">제휴문의 </a>
            </div>
            <div>
              <SnsBtn img={insta} />
              <SnsBtn img={fb} />
              <SnsBtn img={yt} />
            </div>
          </Links>

          <InfoTxt>
            <strong>(주)HODU SHOP</strong>
            <br />
            제주특별자치도 제주시 동광고 137 제주코딩베이스캠프
            <br />
            사업자 번호 : 000-0000-0000 | 통신판매업
            <br />
            대표 : 김호두
          </InfoTxt>
        </div>
      </Footer>
    </div>
  );
};

const Footer = styled.footer`
  width: 100%;
  bottom: 0;
  background: var(--gray-6, #f2f2f2);
  padding: 60px 0 63px 0px;
`;

const Links = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #c4c4c4;
  padding-bottom: 30px;
  margin-bottom: 30px;
`;

const InfoTxt = styled.p`
  font-size: 14px;
  color: var(--767676, #767676);
  line-height: 24px;
`;

const SnsBtn = styled.button`
  width: 32px;
  height: 32px;
  background: url(${(props) => props.img}) no-repeat center;

  & + & {
    margin-left: 14px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  grid-gap: 70px;
  margin: 0 auto 50px auto;
  max-width: calc(380px * 3 + 70px * 2);
`;

export default BuyerMain;
