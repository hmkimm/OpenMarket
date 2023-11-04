import { useEffect, useState } from "react";
import ProductDetailAPI from "../API/Product/ProductDetailAPI";
import BasicHeader from "../Components/Header/BasicHeader";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../Components/Common/Button";
import CountButton from "../Components/CountButton";
import FlexLayout from "../Style/FlexLayout";
import { Layout } from "../Style/Layout";
import AddCartAPI from "../API/Product/AddCartAPI";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import cartProducts from "../Recoil/cart/cartProducts";
import HorizontalLine from "Style/HorizontalLine";
import MetaTag from "Components/Common/MetaTag";
import userToken from "Recoil/userToken/userToken";
import product from "Recoil/cart/product";

interface ProductDetailProps {
  color?: string;
  $isSelected?: boolean;
}

export interface productDetail {
  image: string;
  store_name: string;
  product_name: string;
  price: number;
  shipping_method: string;
  shipping_fee: number;
  product_info: string;
  stock: number;
  product_id: number;
}

interface ContentButtonType {
  $isClicked?: boolean;
}

export interface ResponseType {
  my_cart: number;
  cart_item_id: number;
  product_id?: number;
  is_active?: boolean;
  quantity?: number;
}
export interface CartInfoType {
  product_id: string | undefined;
  quantity: number;
  check: boolean;
}
const ProductDetail = (props: ProductDetailProps) => {
  const navigate = useNavigate();
  const params = useParams();
  const productId = params.productId;
  const token = useRecoilValue(userToken);
  const getDetail = ProductDetailAPI(productId, token);
  const [productDetail, setProductDetail] = useState<productDetail>({
    image: "",
    store_name: "",
    product_name: "",
    price: 0,
    shipping_method: "",
    product_info: "",
    shipping_fee: 0,
    stock: 0,
    product_id: 0,
  });
  const productStock = productDetail?.stock;
  console.log("남은 재고 : ", productStock);
  const [savedCart, setSavedCart] = useRecoilState(cartProducts);
  console.log("cart 🥎 : ", savedCart);
  const [isClicked, setIsClicked] = useState<null | number>(null);
  const [orderNum, setOrderNum] = useState(1);
  const [cartInfo, setCartInfo] = useState({
    product_id: productId,
    quantity: 1,
    check: true,
  });
  console.log("cartInfo : ", cartInfo);
  const setDirectProduct = useSetRecoilState(product);
  const addCart = AddCartAPI(cartInfo);

  const handleClick = (num: number) => {
    setIsClicked(num);
  };
  const handleCart = async () => {
    await addCart();
    navigate("/cart");
  };

  const handleCountChange = (orderNum: number) => {
    if (cartInfo.check) {
      setCartInfo((prev) => ({
        ...prev,
        quantity: orderNum,
        check: productStock >= orderNum,
      }));
    }
  };

  useEffect(() => {
    const handleDetail = async () => {
      const res = await getDetail();

      setProductDetail(res);
    };
    handleDetail();
    console.log('savedCart : ', savedCart)
  }, []);

  const handleDirectBuying = () => {
    setDirectProduct({
      ...productDetail,
      orderNum,
    });
    navigate("/order");
  };

  console.log("상품 상세⛸️ : ", productDetail);
  return (
    <>
      <MetaTag
        title="Mulkong 마켓 상품보기"
        description={`Mulkong 마켓에서 ${productDetail?.product_name} 상품의 가격, 배송정보 등의 세부사항을 확인해보세요`}
        imageUrl={productDetail?.image}
        imageWidth="800"
        imageHeight="400"
        url="https://d1aj463p8fjhgr.cloudfront.net/products/152"
      />

      <BasicHeader />
      {productDetail.image && (
        <ProductDetailLayout>
          <ProductLayout>
            <ProductImage
              src={productDetail?.image}
              alt={productDetail?.product_name}
            />
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
              <FlexLayout $jc="space-between">
                <DeliveryMethod>
                  {productDetail?.shipping_method === "PARCEL"
                    ? "택배배송"
                    : "화물배달"}{" "}
                  /&nbsp;
                  {productDetail?.shipping_fee !== 0
                    ? `${productDetail?.shipping_fee}원`
                    : "무료배송"}
                </DeliveryMethod>
                <div style={{ color: "var(--gray)" }}>
                  남은 재고 : {productStock}개
                </div>
              </FlexLayout>
              <HorizontalLine />
              <CountButton
                orderNum={orderNum}
                setOrderNum={setOrderNum}
                handleCountChange={handleCountChange}
                productStock={productStock}
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
                  <PriceCurrency color="var(--primary)">
                    원(배송비 별도)
                  </PriceCurrency>
                </FlexLayout>
              </FlexLayout>
              <FlexLayout $gap="14px">
                <Button
                  width="416px"
                  onClick={handleDirectBuying}
                  disabled={!productStock}
                >
                  바로 구매
                </Button>
                <Button
                  width="200px"
                  onClick={handleCart}
                  disabled={!productStock}
                >
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
          {isClicked !== 1 && isClicked !== null && (
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

const ContentButton = styled.button<ContentButtonType>`
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
