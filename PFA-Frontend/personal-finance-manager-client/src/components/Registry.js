import { useState, useContext } from 'react';
import { registerUser, saveToken } from '../services/authService';
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Registry() {
    // Local component state
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await registerUser(email, password);
            login(email, data.token);
            navigate("/profile");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Registro</h2>

            <form className="login-form" onSubmit={handleSubmit}>
                {/* Email input */}
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Introduce tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                {/* Password input */}
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Introduce tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {/* Submit button */}
                <button type="submit" className="login-btn">
                    Login
                </button>
            </form>
        </div>
    );
}
