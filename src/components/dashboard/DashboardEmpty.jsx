// src/components/DashboardEmpty.jsx
// A presentational component for the "no data" state

const DashboardEmpty = ({ poolName }) => (
  <div className="border border-yellow-500 p-4 rounded text-yellow-400">
    <p>No dashboard data found for {poolName}.</p>
  </div>
);

export default DashboardEmpty;