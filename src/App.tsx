import React from "react";
import AppRoutes from "./Router/AppRoutes";

import GlobalStyle from "./GlobalStyle";

import { RecoilRoot } from "recoil";
import { Helmet } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "react-query";
import { CookiesProvider } from "react-cookie";

const App: React.FC = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <RecoilRoot>
          <GlobalStyle />
          <AppRoutes />
        </RecoilRoot>
      </CookiesProvider>
    </QueryClientProvider>
  );
};

export default App;
