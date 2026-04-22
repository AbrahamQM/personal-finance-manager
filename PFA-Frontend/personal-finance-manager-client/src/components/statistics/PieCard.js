// src/components/statistics/PieCard.js
import { Pie } from "react-chartjs-2";

/**
 * Renders a card containing a title, a total amount and a pie chart.
 */
const PieCard = ({ title, total, data, options }) => {
  return (
    <div className="stats-card">
      <h3>{title}</h3>
      <p>Total: <strong>{total.toFixed(2)}€</strong></p>
      <div className="chart-box">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PieCard;
