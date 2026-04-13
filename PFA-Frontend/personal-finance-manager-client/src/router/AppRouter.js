// src/router/AppRouter.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Registry from "../components/Registry";
import RequireAuth from "./RequireAuth";
import Profile from "../components/Profile";
import Category from "../components/Category";

// Pages
import Home from "../components/Home";
import Login from "../components/Login";

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
          {/* Protected route */}
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/category"
            element={
              <RequireAuth>
                <Category />
              </RequireAuth>
            }
          />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;
