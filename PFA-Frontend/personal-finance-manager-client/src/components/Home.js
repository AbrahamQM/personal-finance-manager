// src/components/Home.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import UserNav from "./UserNav";

const Home = () => {
  const { user, isAuthenticated } = useContext(AuthContext);

  return (
    <div className="container">
      {/* If authenticated → show UserNav */}
      {isAuthenticated && (
        <UserNav />
      )}
      <h2>Bienvenido</h2>
      <p>{isAuthenticated ? user?.email : "Ve al botón 'Login' para acceder o regístrate en 'Registro'"} Personal Financial Management APP</p>
    </div>
  );
};

export default Home;
