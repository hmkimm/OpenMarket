import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { CartItemType } from "../../\btypes";

const { persistAtom } = recoilPersist();

const cartProducts = atom<CartItemType[]>({
  key: "cartProducts",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export default cartProducts;
