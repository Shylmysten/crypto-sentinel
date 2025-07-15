// src/components/Dashboard.jsx
import StatsCard from '../components/StatsCard';
import WorkerList from '../components/WorkerList';
import RewardsTable from '../components/RewardTable';
import { usePoolStats } from '../hooks/usePoolStats';
import { POOL_NAMES } from '../constants/pools';


const Dashboard = ({ wallet, pool }) => {
  const { dashboard, workers, payouts, loading, error } = usePoolStats(wallet, pool);


  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!dashboard) return <p>No stats available for this wallet.</p>;

  return (
    <div className="dashboard">
      <h2>Dashboard for {wallet} on ({POOL_NAMES[pool] || pool})</h2>

      <div className="stats-grid">
        <StatsCard 
          label="Current Hashrate" 
          value={`${(dashboard?.currentHashrate || 0).toFixed(2)} H/s`} 
        />
        <StatsCard 
          label="Average Hashrate" 
          value={`${(dashboard?.averageHashrate || 0).toFixed(2)} H/s`} 
        />
        <StatsCard 
          label="Unpaid Balance" 
          value={`${((dashboard?.unpaid || 0) / 1e18).toFixed(5)} ETH`}   
        />
        <StatsCard 
          label="Active Workers" 
          value={dashboard?.activeWorkers || 0}          
        />
      </div>


      <WorkerList workers={workers} />
      <RewardsTable payouts={payouts} />
    </div>
  );
};

export default Dashboard;