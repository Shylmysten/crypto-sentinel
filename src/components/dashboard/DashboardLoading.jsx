// src/components/DashboardLoading.jsx
// A presentational component for the loading state

const DashboardLoading = ({ poolName, label }) => (
  <div className="border border-green-500 p-4 rounded text-green-300">
    <p>
      ⏳ Loading {poolName} data for {label}...
    </p>
  </div>
);

export default DashboardLoading;