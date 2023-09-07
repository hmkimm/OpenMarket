import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const cartItem = atom({
  key: "cartItem",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export default cartItem;
