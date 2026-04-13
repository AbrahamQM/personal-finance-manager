// src/components/Profile.js
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getUserState } from "../services/userService";
import { Link } from "react-router-dom";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await getUserState();
                setProfileData(data);
            } catch (err) {
                console.error("Error loading profile:", err);
            }
        };

        loadProfile();
    }, []);

    return (

        <div className="container">
            <nav className="page-subnav">
                <Link to="/category">
                    <button className="nav-btn">Gestionar categorías</button>
                </Link>
            </nav>

            <h2>Perfil de usuario</h2>
            <div className="profile-card">
                <h3>Información de la cuenta</h3>
                <p><strong>Email:</strong> {user?.email}</p>

                {/* Placeholder for future financial data */}
                <h3>Resumen Financiero</h3>
                <p>{profileData && JSON.stringify(profileData)}</p>
            </div>
        </div>

    );
};
export default Profile;
