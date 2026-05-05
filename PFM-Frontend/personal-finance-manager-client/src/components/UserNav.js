// src/components/UserNav.js
import { Link } from "react-router-dom";

const UserNav = () => {
    return (
        <div >
            <nav className="page-subnav">
                <Link to="/profile">
                    <button className="nav-btn">Perfil</button>
                </Link>
                <Link to="/category">
                    <button className="nav-btn">Gestionar categorías</button>
                </Link>
                <Link to="/transaction">
                    <button className="nav-btn">Gestionar transacciones</button>
                </Link>
                <Link to="/statistics">
                    <button className="nav-btn">Estadísticas</button>
                </Link>
            </nav>
        </div>
    )
}

export default UserNav;