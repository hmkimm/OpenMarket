import React from "react";
import AppRoutes from "./Router/AppRoutes";

import GlobalStyle from "./GlobalStyle";

import { RecoilRoot } from "recoil";
import { Helmet } from "react-helmet-async";

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Helmet>
        <AppRoutes />
      </Helmet>
    </RecoilRoot>
  );
};

export default App;
