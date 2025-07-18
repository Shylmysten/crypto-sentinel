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

  // ✅ Step 6: Decrypt token if needed - handle errors safely
  const [decrypted, decryptError] = useMemo(() => {
    try {
      const result = (pool === 'powerpool' || pool === 'hiveos')
        ? decryptToken(walletOrToken)
        : walletOrToken;
      return [result, null];
    } catch (error) {
      console.error('Decryption failed for pool:', pool, 'Error:', error.message);
      return [null, error];
    }
  }, [walletOrToken, pool]);

  // ✅ Use decrypted token (or original wallet) for stats hook
  const {
    dashboard,
    workers,
    payouts,
    loading,
    error,
    lastUpdated,
    refreshData,
  } = usePoolStats(decrypted, pool);

  const unit = useMemo(() => {
    // Debug logging to see what we're getting
    console.log('DashboardCard unit calculation:', {
      pool,
      'dashboard?.unit': dashboard?.unit,
      'dashboard?.balanceInfo': dashboard?.balanceInfo,
      'full dashboard': dashboard
    });
    
    // First, try to get unit from dashboard data if available
    if (dashboard?.unit) {
      console.log('Using dashboard.unit:', dashboard.unit);
      return dashboard.unit;
    }
    
    // For PowerPool, check the balance data for currency
    if (pool === 'powerpool' && dashboard?.balanceInfo?.currency) {
      console.log('Using PowerPool balanceInfo.currency:', dashboard.balanceInfo.currency);
      return dashboard.balanceInfo.currency;
    }
    
    // Pool-specific defaults
    const defaultUnit = (() => {
      switch (pool) {
        case 'hiveos':
          return '';
        case 'powerpool':
          return 'DOGE'; // PowerPool typically mines DOGE
        case 'f2pool':
          return 'BTC';
        case 'ethermine':
        case 'flexpool':
          return 'ETH';
        default:
          return 'ETH';
      }
    })();
    
    console.log('Using default unit for pool', pool, ':', defaultUnit);
    return defaultUnit;
  }, [pool, dashboard]);

  // Return early for decryption errors
  if (decryptError) {
    return (
      <DashboardError 
        message={`❌ Token decryption failed: ${decryptError.message}`}
      />
    );
  }

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
        <div className="flex items-center gap-3 text-sm text-green-300">
          <button
            onClick={refreshData}
            disabled={loading}
            className="flex items-center gap-1 px-2 py-1 rounded bg-green-700 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Refresh data"
          >
            <svg 
              className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
          <div className="flex items-center gap-2">
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