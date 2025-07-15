// src/components/StatsCard.jsx
const StatsCard = ({ label, value }) => (
  <div className="stats-card">
    <strong>{label}</strong>
    <p>{value}</p>
  </div>
);

export default StatsCard;
