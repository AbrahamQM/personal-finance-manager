// src/components/Login.js
import { useState, useContext } from "react";
import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await loginUser(email, password);
            login(email, data.token);
            navigate("/profile");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form className="login-form" onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                    type="email"
                    placeholder="Introduce tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    placeholder="Introduce tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" className="login-btn">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
