import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const cartProducts = atom({
  key: "cartProducts",
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export default cartProducts;
