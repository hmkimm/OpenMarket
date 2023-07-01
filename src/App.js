import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LogIn from "./Pages/LogIn";
import GlobalStyle from "./GlobalStyle";

function App() {
  return (
    <div>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
