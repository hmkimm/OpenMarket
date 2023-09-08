import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const cartInfo = atom({
  key: "cartInfo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export default cartInfo;
