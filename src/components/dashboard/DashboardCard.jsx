// src/components/DashboardCard.jsx
import { useMemo } from 'react';
import { usePoolMeta } from '../../hooks/usePoolMeta';
import { usePoolStats } from '../../hooks/usePoolStats';
import EarningsSummary from '../earnings/EarningsSummary';
import PoolStatsTable from '../pools/PoolStatsTable';
import WorkerTable from '../workers/WorkerTable';
import WorkerList from '../workers/WorkerList';
import RewardsTable from '../earnings/RewardsTable';
import { isWalletValid } from '../../utils/helpers';
import { decryptToken } from '../../utils/crypto';
import DashboardError from './DashboardError';
import DashboardLoading from './DashboardLoading';
import DashboardEmpty from './DashboardEmpty';

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

  const unit = useMemo(() => {
    switch (pool) {
      case 'hiveos':
        return '';
      default:
        return 'ETH';
    }
  }, [pool]);

  const poolMeta = usePoolMeta(pool);

  if (!isWalletValid(decrypted, pool)) {
    return (
      <DashboardError 
        message={`❌ Invalid wallet/token format for ${poolMeta.name}`}
      />
    );
  }

  if (loading) {
    return (
      <DashboardLoading
        poolName={poolMeta.name}
        label={label || decrypted}
      />
    );
  }

  if (error) {
    return (
      <DashboardError 
        message={`❌ Error loading data: ${error}`}
      />
    );
  }

  if (!dashboard) {
    return (
      <DashboardEmpty 
        poolName={poolMeta.name}
      />
    );
  }

  return (
    <div className="border border-green-500 p-6 rounded shadow bg-black bg-opacity-60 text-green-300 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-green-400">
          {label || decrypted}
        </h3>
        <div className="flex items-center gap-2 text-sm text-green-300">
          {poolMeta.hasIcon && (
            <img
              src={poolMeta.icon}
              alt={`${poolMeta.name} mining pool icon`}
              className="w-5 h-5"
            />
          )}
          {poolMeta.name}
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
        unit={unit}
      />

      {dashboard.poolStats ? (
        <PoolStatsTable stats={dashboard.poolStats} />
      ) : (
        <p className="text-sm text-gray-400">No pool stats available.</p>
      )}

      <WorkerList workers={workers} />
      <WorkerTable workers={workers} />
      <RewardsTable rewards={payouts} unit={unit} />
    </div>
  );
};

export default DashboardCard;