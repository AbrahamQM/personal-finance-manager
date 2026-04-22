// src/components/Statistics.js
import { useEffect, useState } from "react";
import UserNav from "./UserNav";
import {
  fetchStatistics,
  groupByCategory,
  buildBalanceSeries,
  getPastTransactions,
  getFutureTransactions
} from "../services/statisticsService";

import {
  Pie,
  Line
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
);

const Statistics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchStatistics();
        setStats(data);
      } catch (err) {
        console.error("Error loading statistics:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <p>Cargando estadísticas...</p>;
  if (!stats) return <p>Error cargando estadísticas.</p>;

  // Prepare pie chart data
  const pastExpenses = groupByCategory(stats.pastTransactions, "EXPENSE");
  const futureExpenses = groupByCategory(stats.futureTransactions, "EXPENSE");
  const pastIncome = groupByCategory(stats.pastTransactions, "INCOME");
  const futureIncome = groupByCategory(stats.futureTransactions, "INCOME");

  const sumValues = (items) =>
    items.reduce((acc, item) => acc + Number(item.value), 0);

  const totalPastExpenses = sumValues(pastExpenses);
  const totalFutureExpenses = sumValues(futureExpenses);
  const totalPastIncome = sumValues(pastIncome);
  const totalFutureIncome = sumValues(futureIncome);


  // Prepare line chart data
  const balanceSeries = buildBalanceSeries(
    stats.monthInitialBalance,
    stats.pastTransactions
  );

  const lineData = {
    labels: balanceSeries.map(p => p.date),
    datasets: [
      {
        label: "Balance",
        data: balanceSeries.map(p => p.balance),
        borderColor: "#0f7a4a",
        backgroundColor: "rgba(15,122,74,0.2)",
        tension: 0.3
      }
    ]
  };

  const pieOptions = {
    plugins: {
      legend: { position: "bottom" }
    }
  };

  const makePieData = (items) => ({
    labels: items.map(i => i.name),
    datasets: [
      {
        data: items.map(i => i.value),
        backgroundColor: [
          "#0f7a4a",
          "#2aa06a",
          "#7bd59a",
          "#6b7280",
          "#0b5f36",
          "#b91c1c",
          "#fca5a5"
        ]
      }
    ]
  });

  return (
    <div className="container statistics-container">
      <UserNav />
      <h2>Estadísticas</h2>

      <div className="stats-grid">

        {/* Balance evolution */}
        <div className="stats-card">
          <h3>Evolución del saldo</h3>
          <p>
            Inicio del mes: <strong>{stats.monthInitialBalance}€</strong><br />
            Saldo actual: <strong>{stats.currentBalance}€</strong>
          </p>
          <div className="chart-box">
            <Line data={lineData} />
          </div>
        </div>

        {/* Past expenses */}
        <div className="stats-card">
          <h3>Gastos del mes por categoría</h3>
          <div className="chart-box">
            <Pie data={makePieData(pastExpenses)} options={pieOptions} />
          </div>
          <p>Total: <strong>{totalPastExpenses.toFixed(2)}€</strong></p>
        </div>

        {/* Future expenses */}
        <div className="stats-card">
          <h3>Gastos futuros del mes</h3>
          <div className="chart-box">
            <Pie data={makePieData(futureExpenses)} options={pieOptions} />
          </div>
          <p>Total: <strong>{totalFutureExpenses.toFixed(2)}€</strong></p>
        </div>

        {/* Past income */}
        <div className="stats-card">
          <h3>Ingresos del mes por categoría</h3>
          <div className="chart-box">
            <Pie data={makePieData(pastIncome)} options={pieOptions} />
          </div>
           <p>Total: <strong>{totalPastIncome.toFixed(2)}€</strong></p>
        </div>

        {/* Future income */}
        <div className="stats-card">
          <h3>Ingresos futuros del mes</h3>
          <div className="chart-box">
            <Pie data={makePieData(futureIncome)} options={pieOptions} />
          </div>
            <p>Total: <strong>{totalFutureIncome.toFixed(2)}€</strong></p>
        </div>

        {/* Past transactions list */}
        <div className="stats-card list-card">
          <h3>Transacciones pasadas</h3>
          <div className="tx-list">
            {getPastTransactions(stats).map(t => (
              <div key={t.id} className="tx-item">
                <span>{t.date}</span>
                <span>{t.categoryName}</span>
                <span>{t.amount}€</span>
              </div>
            ))}
          </div>
        </div>

        {/* Future transactions list */}
        <div className="stats-card list-card">
          <h3>Transacciones futuras</h3>
          <div className="tx-list">
            {getFutureTransactions(stats).map(t => (
              <div key={t.id} className="tx-item">
                <span>{t.date}</span>
                <span>{t.categoryName}</span>
                <span>{t.amount}€</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Statistics;
