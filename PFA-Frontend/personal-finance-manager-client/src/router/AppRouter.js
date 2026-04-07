// src/router/AppRouter.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Pages
import Home from "../components/Home";
import Login from "../components/Login";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />

      <main className="App-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;
