// src/components/dashboard/DashboardCard.jsx
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
  const poolMeta = usePoolMeta(pool);

  // ✅ Step 6: Decrypt token if needed
  const decrypted = (pool === 'powerpool' || pool === 'hiveos')
    ? decryptToken(walletOrToken)
    : walletOrToken;

  // ✅ Create safe display value that never exposes full sensitive data
  const getDisplayValue = () => {
    if (label) return label; // Use label if provided
    
    const isTokenPool = pool === 'hiveos' || pool === 'powerpool';
    if (isTokenPool) {
      // Never show actual API tokens - show generic label
      return `${poolMeta.name} API Token`;
    } else {
      // For wallet addresses, show first 6 and last 4 characters
      return decrypted?.length > 10 
        ? `${decrypted.substring(0, 6)}...${decrypted.substring(decrypted.length - 4)}`
        : decrypted;
    }
  };

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
        label={getDisplayValue()}
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
          {getDisplayValue()}
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