import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LogIn from "./Pages/LogIn";
import GlobalStyle from "./GlobalStyle";
import BuyerMain from "./Pages/BuyerMain";

function App() {
  return ( 
    <div>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/buyermain" element={<BuyerMain />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
