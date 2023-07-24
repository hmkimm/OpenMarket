import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LogIn from "./Pages/LogIn";
import GlobalStyle from "./GlobalStyle";
import BuyerMain from "./Pages/BuyerMain";
import SellerMain from "./Pages/SellerMain";
import { RecoilRoot } from "recoil";
import AddProduct from "./Pages/AddProduct";

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/buyermain" element={<BuyerMain />} />
          <Route path="/sellermain" element={<SellerMain />} />
          <Route path="/addproduct" element={<AddProduct />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}
export default App;
