// src/components/statistics/LineCard.js
import { Line } from "react-chartjs-2";

/**
 * Renders a card containing a title, summary info and a line chart.
 */
const LineCard = ({ title, initialBalance, currentBalance, data }) => {
  return (
    <div className="stats-card">
      <h3>{title}</h3>
      <p>
        Inicio del mes: <strong>{initialBalance}€</strong><br />
        Saldo actual: <strong>{currentBalance}€</strong>
      </p>
      <div className="chart-box">
        <Line data={data} />
      </div>
    </div>
  );
};

export default LineCard;
