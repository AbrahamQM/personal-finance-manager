// src/components/Statistics.js
import { useEffect, useState } from "react";
import UserNav from "./UserNav";
import PieCard from "./statistics/PieCard";
import LineCard from "./statistics/LineCard";
import TransactionList from "./statistics/TransactionList";

import {
  fetchStatistics,
  groupByCategory,
  buildBalanceSeries,
  getPastTransactions,
  getFutureTransactions
} from "../services/statisticsService";

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
  const sumValues = (items) => items.reduce((acc, item) => acc + Number(item.value), 0);

  const pastExpenses = groupByCategory(stats.pastTransactions, "EXPENSE");
  const futureExpenses = groupByCategory(stats.futureTransactions, "EXPENSE");
  const pastIncome = groupByCategory(stats.pastTransactions, "INCOME");
  const futureIncome = groupByCategory(stats.futureTransactions, "INCOME");
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

        <LineCard
          title="Evolución del saldo"
          initialBalance={stats.monthInitialBalance}
          currentBalance={stats.currentBalance}
          data={lineData}
        />

        <PieCard
          title="Gastos del mes por categoría"
          total={totalPastExpenses}
          data={makePieData(pastExpenses)}
          options={pieOptions}
        />

        <PieCard
          title="Gastos futuros del mes"
          total={totalFutureExpenses}
          data={makePieData(futureExpenses)}
          options={pieOptions}
        />

        <PieCard
          title="Ingresos del mes por categoría"
          total={totalPastIncome}
          data={makePieData(pastIncome)}
          options={pieOptions}
        />

        <PieCard
          title="Ingresos futuros del mes"
          total={totalFutureIncome}
          data={makePieData(futureIncome)}
          options={pieOptions}
        />

        <TransactionList
          title="Transacciones pasadas"
          items={getPastTransactions(stats)}
        />

        <TransactionList
          title="Transacciones futuras"
          items={getFutureTransactions(stats)}
        />

      </div>


    </div>
  );
};

export default Statistics;
