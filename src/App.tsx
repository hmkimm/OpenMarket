import React from "react";
import AppRoutes from "./Router/AppRoutes";

import GlobalStyle from "./GlobalStyle";

import { RecoilRoot } from "recoil";

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <AppRoutes />
    </RecoilRoot>
  );
};

export default App;
