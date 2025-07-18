// src/components/DashboardError.jsx
// A presentational component for error and invalid input states

const DashboardError = ({ message }) => (
  <div className="border border-red-500 p-4 rounded text-red-400">
    <p>{message}</p>
  </div>
);

export default DashboardError;
