// src/components/Dashboard.jsx
import StatsCard from '../components/StatsCard';
import WorkerList from '../components/WorkerList';
import RewardsTable from '../components/RewardTable';
import { usePoolStats } from '../hooks/usePoolStats';
import { POOL_META } from '../constants/pools';


const Dashboard = ({ wallet, pool }) => {
  const { dashboard, workers, payouts, loading, error, lastUpdated } = usePoolStats(wallet, pool);


const isWalletValid = /^0x[a-fA-F0-9]{40}$/.test(wallet);

  if (!isWalletValid) {
    return <p style={{ color: 'red' }}>Invalid wallet address format.</p>;
  }

  if (loading) {
    return (
      <div className="loading-state">
        <p>⏳ Loading dashboard for {POOL_META[pool]?.name || pool}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state" style={{ color: 'red' }}>
        <p>❌ Error: {error}</p>
        <p>Please check your wallet address and try again.</p>
      </div>
    );
  }

  if (!dashboard) {
    return <p>No data found for this wallet on {POOL_META[pool]?.name || pool}.</p>;
  }

  return (
    <div className="dashboard">
      <h2 className="dashboard-heading">
          Dashboard for {wallet}{' '}
          <span className="pool-meta">
            <img
              src={POOL_META[pool]?.icon}
              alt={POOL_META[pool]?.name}
              className="pool-icon"
            />
            {POOL_META[pool]?.name || pool}
          </span>
      </h2>

      {lastUpdated && (
        <p style={{ fontSize: '0.85rem', color: '#666' }}>
          Last updated: {lastUpdated.toLocaleString()}
        </p>
      )}



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