// src/components/statistics/TransactionList.js

/**
 * Renders a scrollable list of transactions inside a card.
 */
const TransactionList = ({ title, items }) => {
  return (
    <div className="stats-card list-card">
      <h3>{title}</h3>
      <div className="tx-list">
        {items.map(t => (
          <div key={t.id} className="tx-item">
            <span>{t.date}</span>
            <span>{t.categoryName}</span>
            <span>{t.amount}€</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
