// src/components/DashboardCard.jsx
import { usePoolStats } from '../hooks/usePoolStats';
import { POOL_META } from '../constants/pools';
import EarningsSummary from './EarningsSummary';
import PoolStatsTable from './PoolStatsTable';
import WorkerTable from './WorkerTable';
import WorkerList from './WorkerList';
import RewardsTable from './RewardsTable';
import { isWalletValid } from '../utils/helpers';
import { decryptToken } from '../utils/crypto'; // ✅ Step 6: Import decryption function

const DashboardCard = ({ walletOrToken, pool, label }) => {
  // ✅ Step 6: Decrypt token if needed
  const decrypted = (pool === 'powerpool' || pool === 'hiveos')
    ? decryptToken(walletOrToken)
    : walletOrToken;

  // ✅ Use decrypted token (or original wallet) for stats hook
  const {
    dashboard,
    workers,
    payouts,
    loading,
    error,
    lastUpdated,
  } = usePoolStats(decrypted, pool);

  const getUnit = () => {
    switch (pool) {
      case 'hiveos':
        return '';
      default:
        return 'ETH';
    }
  };

  if (!isWalletValid(decrypted, pool)) {
    return (
      <div className="border border-red-500 p-4 rounded text-red-400">
        <p>❌ Invalid wallet/token format for {POOL_META[pool]?.name || pool}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="border border-green-500 p-4 rounded text-green-300">
        <p>⏳ Loading {POOL_META[pool]?.name || pool} data for {label || decrypted}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-red-500 p-4 rounded text-red-400">
        <p>❌ Error loading data: {error}</p>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="border border-yellow-500 p-4 rounded text-yellow-400">
        <p>No dashboard data found for {POOL_META[pool]?.name || pool}.</p>
      </div>
    );
  }

  return (
    <div className="border border-green-500 p-6 rounded shadow bg-black bg-opacity-60 text-green-300 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-green-400">
          {label || decrypted}
        </h3>
        <div className="flex items-center gap-2 text-sm text-green-300">
          {POOL_META[pool]?.icon && (
            <img
              src={POOL_META[pool].icon}
              alt={POOL_META[pool].name}
              className="w-5 h-5"
            />
          )}
          {POOL_META[pool]?.name || pool}
        </div>
      </div>

      {lastUpdated && (
        <p className="text-xs text-green-400">
          Last updated: {lastUpdated.toLocaleString()}
        </p>
      )}

      <EarningsSummary
        unpaid={dashboard.unpaid ?? dashboard.balance ?? 0}
        estimated={dashboard.estimatedEarnings ?? 0}
        unit={getUnit()}
      />

      {dashboard.poolStats ? (
        <PoolStatsTable stats={dashboard.poolStats} />
      ) : (
        <p className="text-sm text-gray-400">No pool stats available.</p>
      )}

      <WorkerList workers={workers} />
      <WorkerTable workers={workers} />
      <RewardsTable rewards={payouts} unit={getUnit()} />
    </div>
  );
};

export default DashboardCard;