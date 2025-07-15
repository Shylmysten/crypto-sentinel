// src/components/Dashboard.jsx
import { useEffect, useState } from 'react';
import { fetchDashboard, fetchWorkers, fetchPayouts } from '../services/ethermineAPI';
import StatsCard from '../components/StatsCard';
import WorkerList from '../components/WorkerList';
import RewardsTable from '../components/RewardTable';

const Dashboard = ({ wallet, pool }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [workers, setWorkers] = useState({});
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const current = dashboardData?.currentHashrate || 0;
  const avg = dashboardData?.averageHashrate || 0;
  const unpaid = dashboardData?.unpaid || 0;
  const workersOnline = dashboardData?.activeWorkers || 0;


  useEffect(() => {
    if (pool !== 'ethermine') {
      console.warn(`Pool ${pool} is not yet supported`);
      return;
    }
    const loadStats = async () => {
      setLoading(true);
      try {
        const [dash, workerStats, payoutStats] = await Promise.all([
          fetchDashboard(wallet),
          fetchWorkers(wallet),
          fetchPayouts(wallet),
        ]);
        setDashboardData(dash.data.currentStatistics);
        //console.log('Worker response:', workerStats);
        setWorkers(workerStats.data.workers);
        setPayouts(payoutStats.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [wallet, pool]);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="dashboard">
      <h2>Dashboard for {wallet}</h2>
      <div className="stats-grid">
        <StatsCard label="Current Hashrate" value={`${current.toFixed(2)} H/s`} />
        <StatsCard label="Average Hashrate" value={`${avg.toFixed(2)} H/s`} />
        <StatsCard label="Unpaid Balance" value={`${(unpaid / 1e18).toFixed(5)} ETH`} />
        <StatsCard label="Active Workers" value={workersOnline} />
      </div>


      <WorkerList workers={workers} />
      <RewardsTable payouts={payouts} />
    </div>
  );
};

export default Dashboard;