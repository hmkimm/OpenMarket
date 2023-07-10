import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LogIn from "./Pages/LogIn";
import GlobalStyle from "./GlobalStyle";
import BuyerMain from "./Pages/BuyerMain";
import SellerMain from "./Pages/SellerMain";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/buyermain" element={<BuyerMain />} />
          <Route path="/sellermain" element={<SellerMain />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}
export default App;
