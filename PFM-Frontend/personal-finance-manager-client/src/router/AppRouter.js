// src/router/AppRouter.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RequireAuth from "./RequireAuth";

// Pages
import Home from "../components/Home";
import Registry from "../components/Registry";
import Login from "../components/Login";
import Profile from "../components/Profile";
import Category from "../components/Category";
import Transaction from "../components/Transaction";
import Statistics from "../components/Statistics";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />

      <main className="App-main">
        <Routes>
          <Route path="*" element={<h2>Ésta página no existe</h2>} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registry" element={<Registry />} />
          {/* Protected routes */}
          <Route path="/profile" element={<RequireAuth> <Profile /> </RequireAuth>} />
          <Route path="/category" element={<RequireAuth> <Category /> </RequireAuth>} />
          <Route path="/transaction" element={<RequireAuth> <Transaction /> </RequireAuth>} />
          <Route path="/statistics" element={<RequireAuth> <Statistics /> </RequireAuth>} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;
