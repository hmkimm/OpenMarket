import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";

import ProductAPI from "../API/Product/ProductAPI";

import BasicHeader from "../Components/Header/BasicHeader";
import insta from "../Assets/Icons/insta.svg";
import fb from "../Assets/Icons/fb.svg";
import yt from "../Assets/Icons/yt.svg";
import ProductItem from "../Components/Common/ProductItem";
import userToken from "../Recoil/userToken/userToken";

interface ProductList {
  results?: MyProduct[];
}
interface MyProduct {
  store_name: string;
  product_name: string;
  product_id: number;
  price: number;
  image: string;
}
interface SnsBtn {
  $img: string;
}
const BuyerMain = () => {
  const token = useRecoilValue(userToken);
  const { fetchproducts } = ProductAPI(token);
  const [productList, setProductList] = useState<ProductList>({
    results: [],
  });

  useEffect(() => {
    const getProduct = async () => {
      const res = await fetchproducts();
      setProductList(res);
      console.log("rendering");
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
            <Link to={`/products/${item.product_id}`} key={i}>
              <ProductItem
                seller={item.store_name}
                name={item.product_name}
                price={item.price?.toLocaleString()}
                img={item.image}
              />
            </Link>
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
              <SnsBtn $img={insta} />
              <SnsBtn $img={fb} />
              <SnsBtn $img={yt} />
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

const SnsBtn = styled.button<SnsBtn>`
  width: 32px;
  height: 32px;
  background: url(${(props) => props.$img}) no-repeat center;

  & + & {
    margin-left: 14px;
  }
`;

const Grid = styled.div`
  display: grid;
  padding-top: 120px;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  grid-gap: 70px;
  margin: 0 auto 50px auto;
  max-width: calc(380px * 3 + 70px * 2);
`;

export default BuyerMain;
