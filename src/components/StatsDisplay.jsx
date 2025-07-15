// src/components/StatsDisplay.jsx
const StatsDisplay = ({ data }) => {
  if (!data) return <p>No data to display.</p>;
  if (data.status !== 'OK') return <p>Failed to fetch stats.</p>;

  const { currentStatistics } = data.data;

  return (
    <div className="stats-display">
      <h2>Current Stats</h2>
      <ul>
        <li>Unpaid Balance: {currentStatistics.unpaid / 1e18} ETH</li>
        <li>Current Hashrate: {currentStatistics.currentHashrate} H/s</li>
        <li>Average Hashrate: {currentStatistics.averageHashrate} H/s</li>
        <li>Active Workers: {currentStatistics.activeWorkers}</li>
      </ul>
    </div>
  );
};

export default StatsDisplay;
