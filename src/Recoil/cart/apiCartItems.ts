import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { CartItemType } from "../../\btypes";
import { ApiCartType } from "Pages/ShoppingCart";

const { persistAtom } = recoilPersist();

const apiCartItems = atom<ApiCartType[]>({
  key: "apiCartItems",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export default apiCartItems;
