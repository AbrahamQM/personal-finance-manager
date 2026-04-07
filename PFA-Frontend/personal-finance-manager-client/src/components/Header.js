// src/components/Header.js
import logo from "../assets/logo.png"; // PNG logo

const Header = () => {
  return (
    <header className="app-header">
      <img src={logo} alt="PFM logo" className="app-logo" />
      <div>
        <h1 className="app-title">Personal Financial Management</h1>
        <p className="app-subtitle">Controla tus finanzas de forma sencilla</p>
      </div>
    </header>
  );
};

export default Header;
