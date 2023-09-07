import React, { useEffect, useState } from "react";
import ProductDetailAPI from "../Utils/Product/ProductDetailAPI";
import BasicHeader from "../Components/Header/BasicHeader";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Button from "../Components/Common/Button";
import CountButton from "../Components/CountButton";
import FlexLayout from "../Style/FlexLayout";
import { Layout } from "../Style/Layout";
import AddCartAPI from "../Utils/Product/AddCartAPI";
import { useRecoilState } from "recoil";
import cartItem from "../Recoil/cartItem/cartItem";
const ProductDetail = (props) => {
  const params = useParams();
  const productId = params.productId;
  const getDetail = ProductDetailAPI(productId);
  const [productDetail, setProductDetail] = useState(() => {});
  const productStock = productDetail?.stock;
  console.log("남은 재고 : ", productStock);
  const [savedCart, setSavedCart] = useRecoilState(cartItem);
  console.log("cart 🥎 : ", savedCart);
  const [isClicked, setIsClicked] = useState("");
  const [orderNum, setOrderNum] = useState(1);
  const [cartInfo, setCartInfo] = useState({
    product_id: productId,
    quantity: 1,
    check: productStock >= orderNum ? true : false,
  });
  const addCart = AddCartAPI(cartInfo);

  const handleClick = (num) => {
    setIsClicked(num);
  };

  const handleCart = async () => {
    const res = await addCart();
    setSavedCart(res);
    setSavedCart((prev) => [...prev, ...res]);
    // console.log("🍏🍏 장바구니 결과", res);
  };

  const handleCountChange = (newOrderNum) => {
    setCartInfo((prev) => ({
      ...prev,
      quantity: newOrderNum,
      check: productStock >= orderNum ? true : false,
    }));
  };
  console.log(cartInfo);

  useEffect(() => {
    const handleDetail = async () => {
      const res = await getDetail();
      setProductDetail(res);
    };
    handleDetail();
  }, [getDetail]);

  console.log("상품 상세⛸️ : ", productDetail);
  return (
    <>
      <BasicHeader />
      {productDetail && (
        <ProductDetailLayout>
          <ProductLayout>
            <ProductImage src={productDetail?.image} />
            <ProudctInfo>
              <CompanyInfo>{productDetail?.store_name}</CompanyInfo>
              <ProductName>{productDetail?.product_name}</ProductName>
              <FlexLayout $jc="flex-start" $ai="baseline">
                <ProductPrice>
                  {productDetail?.price?.toLocaleString()}
                </ProductPrice>
                <PriceCurrency>원</PriceCurrency>
              </FlexLayout>
            </ProudctInfo>
            <DeliveryInfo>
              <DeliveryMethod>
                {productDetail?.shipping_method === "PARCEL"
                  ? "택배배송"
                  : "화물배달"}{" "}
                /&nbsp;
                {productDetail?.shipping_fee !== 0
                  ? `${productDetail?.shipping_fee}원`
                  : "무료배송"}
              </DeliveryMethod>
              <HorizontalLine />
              <CountButton
                orderNum={orderNum}
                setOrderNum={setOrderNum}
                handleCountChange={handleCountChange}
              >
                {orderNum}
              </CountButton>
              <HorizontalLine />
              <FlexLayout $jc="space-between" $ai="flex-end">
                <div>총 상품 금액</div>
                <FlexLayout $ai="flex-end">
                  <div>총 수량 {orderNum} 개&nbsp;&nbsp;|&nbsp;&nbsp; </div>
                  <div>
                    <ProductPrice color="var(--primary)">
                      {(productDetail?.price * orderNum).toLocaleString()}
                    </ProductPrice>
                  </div>
                  <PriceCurrency color="var(--primary)">원</PriceCurrency>
                </FlexLayout>
              </FlexLayout>
              <FlexLayout $gap="14px">
                <Button width="416px">바로 구매</Button>
                <Button width="200px" $empty onClick={handleCart}>
                  장바구니
                </Button>
              </FlexLayout>
            </DeliveryInfo>
          </ProductLayout>
          <div>
            <FlexLayout>
              <ContentButton
                onClick={() => {
                  handleClick(1);
                }}
                $isClicked={isClicked === 1}
              >
                상세 정보
              </ContentButton>
              <ContentButton
                onClick={() => {
                  handleClick(2);
                }}
                $isClicked={isClicked === 2}
              >
                리뷰
              </ContentButton>
              <ContentButton
                onClick={() => {
                  handleClick(3);
                }}
                $isClicked={isClicked === 3}
              >
                Q&A
              </ContentButton>
              <ContentButton
                onClick={() => {
                  handleClick(4);
                }}
                $isClicked={isClicked === 4}
              >
                반품/교환정보
              </ContentButton>
            </FlexLayout>
          </div>
          {(isClicked !== 1 && isClicked !== "") && (
            <MoreInfo>준비 중</MoreInfo>
          )}
          {isClicked === 1 && (
            <MoreInfo>{productDetail?.product_info}</MoreInfo>
          )}
        </ProductDetailLayout>
      )}
    </>
  );
};

const ProductDetailLayout = styled(Layout)`
  padding-top: 160px;
  padding-bottom: 80px;
`;
const ProductLayout = styled.main`
  display: grid;
  grid-gap: 20px;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    "img product"
    "img delivery ";
`;

const ProductImage = styled.img`
  width: 600px;
  height: 600px;
  object-fit: contain;
  grid-area: img;
`;

const ProudctInfo = styled.section`
  grid-area: product;
`;
const CompanyInfo = styled.div`
  color: var(--gray);
`;

const ProductName = styled.div`
  margin-top: 16px;
  font-size: 36px;
`;

const ProductPrice = styled.div`
  display: inline-block;
  margin-top: 20px;
  margin-bottom: -10px;
  font-weight: 700;
  font-size: 36px;
  color: ${(props) => props.color || "black"};
  /* align-items: middle; */
  /* align-self: center; */
`;

const PriceCurrency = styled.div`
  color: ${(props) => props.color || "var(--gray)"};
`;

const DeliveryInfo = styled.section`
  grid-area: delivery;
`;

const DeliveryMethod = styled.div`
  color: var(--gray);
`;

const HorizontalLine = styled.div`
  border: 0.5px solid var(--light-gray);
  width: 100%;
  margin: 20px 0;
`;

const ContentButton = styled.button`
  width: 320px;
  padding: 19px;
  background-color: white;
  color: ${(props) =>
    props.$isClicked ? "var(--primary)" : "var(--light-gray)"};
  border-bottom: ${(props) =>
    props.$isClicked
      ? "4px solid var(--primary)"
      : "4px solid var(--light-gray)"};
  margin: 140px 0 70px;

  &:hover {
    background-color: var(--primary);
    color: white;
    border-radius: 10px 10px 0 0;
  }
`;

const MoreInfo = styled.section`
  width: 100%;
  height: 180px;
  line-height: 180px;
  text-align: center;
  background-color: var(--light-gray);
  color: white;
`;
export default ProductDetail;
