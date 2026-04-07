// src/components/Header.js
import logo from "../assets/logo.png"; // PNG logo
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="app-header">
      <img src={logo} alt="PFM logo" className="app-logo" />
      <div>
        <h1 className="app-title">Personal Financial Management</h1>
        <p className="app-subtitle">Controla tus finanzas de forma sencilla</p>
      </div>

        <nav className="app-nav">
          <Link to="/">Inicio</Link>
          <Link to="/login">Login</Link>
          <Link to="/registry">Registro</Link>
        </nav>
    </header>
  );
};
// TODO cuando estás logueado no debe aparecer el login ni el registry, sino un botón de logout y un enlace a tu perfil (con tus datos y tus finanzas)
export default Header;
