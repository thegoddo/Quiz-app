import "./App.css";
import Home from "./component/Home";
import Card from "./component/Card";
import Login from "./component/Login";
import Register from "./component/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Define a route for your home page */}
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Card />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
