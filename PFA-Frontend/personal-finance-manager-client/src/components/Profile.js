// src/components/Profile.js
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getUserState } from "../services/userService";
import UserNav from "./UserNav";

/**
 * Formats a number as currency using the user's locale.
 */
const formatCurrency = (value) => {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Number(value));
  } catch {
    return `${Number(value).toFixed(2)} €`;
  }
};

/**
 * Financial summary card.
 * Expects an object with: currentBalance, totalIncomeThisMonth, totalExpenseThisMonth, dailyAvailable
 */
const FinancialSummary = ({ data }) => {
  if (!data) return null;

  const { currentBalance, totalIncomeThisMonth, totalExpenseThisMonth, dailyAvailable } = data;

  return (
    <div className="financial-summary">
      <div className="fs-card balance">
        <div className="fs-label">Saldo actual</div>
        <div className="fs-value">{formatCurrency(currentBalance)}</div>
      </div>

      <div className="fs-card row">
        <div className="fs-item income">
          <div className="fs-label">Ingresos este mes</div>
          <div className="fs-value">{formatCurrency(totalIncomeThisMonth)}</div>
        </div>

        <div className="fs-item expense">
          <div className="fs-label">Gastos este mes</div>
          <div className="fs-value">{formatCurrency(totalExpenseThisMonth)}</div>
        </div>
      </div>

      <div className="fs-card available">
        <div className="fs-label">Disponible diario</div>
        <div className="fs-value">{formatCurrency(dailyAvailable)}</div>
      </div>
    </div>
  );
};

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
      <UserNav />
      <h2>Perfil de usuario</h2>

      <div className="profile-card">
        <h3>Información de la cuenta</h3>
        <p><strong>Email:</strong> {user?.email}</p>

        <h3>Resumen Financiero</h3>
        <FinancialSummary data={profileData} />

        {/* Optional: show recent transactions preview */}
        {profileData?.pastTransactions?.length > 0 && (
          <>
            <h4>Últimas transacciones registradas</h4>
            <ul className="mini-tx-list">
              {profileData.pastTransactions.slice(0, 5).map((tx) => (
                <li key={tx.id} className="mini-tx-item">
                  <span className={`mini-tx-amount ${tx.type === "INCOME" ? "income" : "expense"}`}>
                    {tx.type === "INCOME" ? "+" : "-"}{Number(tx.amount).toFixed(2)}€
                  </span>
                  <span className="mini-tx-meta">{tx.categoryName} · {tx.date}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
