import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { CartItem } from "\btypes";
const { persistAtom } = recoilPersist();

const cartProducts = atom<CartItem[]>({
  key: "cartProducts",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export default cartProducts;
