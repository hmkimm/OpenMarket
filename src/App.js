import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LogIn from "./Pages/LogIn";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
