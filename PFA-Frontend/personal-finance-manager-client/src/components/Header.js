// src/components/Header.js
import { useContext } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const InicioButton = () => {
    return (
        <Link to="/">
          <button className="nav-btn">
            Inicio
          </button>
        </Link>
    )
  };

  // Handle logout click
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="app-header">
      <img src={logo} alt="PFM logo" className="app-logo" />

      <div>
        <h1 className="app-title">Personal Financial Management</h1>
        <p className="app-subtitle">Controla tus finanzas de forma sencilla</p>
      </div>

      <nav className="app-nav">

        {/* If NOT authenticated → show Login + Registry */}
        {!isAuthenticated && (
          <>
            <InicioButton/>
            <Link to="/login">
              <button className="nav-btn">
                Login
              </button>
            </Link>

            <Link to="/registry">
              <button className="nav-btn" >
                Registro
              </button>
            </Link>
          </>
        )}

        {/* If authenticated → show Profile + Logout */}
        {isAuthenticated && (
          <>
            <span className="nav-email">{user.email}</span>
            <InicioButton/>
            <Link to="/profile">
              <button className="nav-btn">
                Perfil
              </button>
            </Link>
            <button className="nav-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
