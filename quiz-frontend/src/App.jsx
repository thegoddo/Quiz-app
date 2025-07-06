import "./App.css";
import Home from "./component/Home";
import Card from "./component/Card";
import Login from "./component/Login";
import Register from "./component/Register";
import Footer from "./component/Footer";
import Header from "./component/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header /> {/* Render the Header here */}
        <main style={{ flexGrow: 1, paddingTop: "56px" }}>
          {" "}
          {/* Add padding to main content, assuming header height is around 56px */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/quiz" element={<Card />}></Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
