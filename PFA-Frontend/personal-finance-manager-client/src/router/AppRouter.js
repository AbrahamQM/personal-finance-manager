// src/router/AppRouter.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Registry from "../components/Registry";

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
          <Route path="/profile" element={<h2>Crear componente perfil de usuario</h2>} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;
