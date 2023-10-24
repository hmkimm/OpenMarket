import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { ApiCartType } from "Pages/ShoppingCart";

const { persistAtom } = recoilPersist();

const product = atom({
  key: "product",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export default product;
