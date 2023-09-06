import AppRoutes from "./Router/AppRoutes";

import GlobalStyle from "./GlobalStyle";

import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <AppRoutes />
    </RecoilRoot>
  );
}
export default App;
