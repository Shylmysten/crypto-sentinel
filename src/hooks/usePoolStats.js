// src/hooks/usePoolStats.js
import { useEffect, useState } from 'react';
import { getPoolService } from '../services/poolService';

export const usePoolStats = (walletOrToken, pool) => {
  const [data, setData] = useState({
    dashboard: null,
    workers: [],
    payouts: [],
    loading: true,
    error: null,
    lastUpdated: null,
  });

  // Enhanced error handling function
  const getErrorMessage = (error, pool) => {
    const message = error.message?.toLowerCase() || '';
    
    // Network/Connection errors
    if (message.includes('network') || message.includes('fetch')) {
      return 'Network connection failed. Please check your internet and try again.';
    }
    
    // Authentication/Invalid wallet errors
    if (message.includes('401') || message.includes('unauthorized') || message.includes('invalid')) {
      return `Invalid ${pool === 'hiveos' || pool === 'powerpool' ? 'API token' : 'wallet address'}. Please check your credentials.`;
    }
    
    // Rate limiting
    if (message.includes('429') || message.includes('rate limit')) {
      return 'Too many requests. Please wait a moment and try again.';
    }
    
    // API unavailable
    if (message.includes('500') || message.includes('503')) {
      return `${pool} API is temporarily unavailable. Please try again later.`;
    }
    
    // Default fallback
    return `Failed to load ${pool} data. Please try again.`;
  };

  useEffect(() => {
    const fetch = async () => {
      setData((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const api = getPoolService(pool);

        let dashboard, workers, payouts;

        if (pool === 'hiveos') {
          const token = walletOrToken;
          const farms = await api.getFarms(token);
          const rigs = await api.getRigs(token, farms[0].id);

          dashboard = {
            unpaid: rigs.reduce((sum, r) => sum + r.stats.unpaid, 0), // optional logic
            estimatedEarnings: 0,
            poolStats: {},
          };

          workers = rigs.map((r) => ({
            name: r.name,
            online: r.online,
            currentHashrate: r.hashrate,
            reportedHashrate: r.reportedHashrate || 0,
            lastSeen: r.updated_at * 1000,
          }));

          payouts = []; // HiveOS doesn’t expose payout data here
        } else {
          [dashboard, workers, payouts] = await Promise.all([
            api.getDashboard(walletOrToken),
            api.getWorkers(walletOrToken),
            api.getPayouts(walletOrToken),
          ]);
        }

        setData({
          dashboard,
          workers,
          payouts,
          loading: false,
          error: null,
          lastUpdated: new Date(),
        });
      } catch (err) {
        // Enhanced logging for debugging - NO sensitive data
        console.error('Pool stats fetch error:', {
          pool,
          walletType: pool === 'hiveos' || pool === 'powerpool' ? 'API_TOKEN' : 'WALLET_ADDRESS',
          errorType: err.name || 'Unknown',
          errorMessage: err.message,
          timestamp: new Date().toISOString(),
          // Only log first line of stack trace to avoid exposing sensitive data
          stack: err.stack?.split('\n')[0]
        });

        setData({
          dashboard: null,
          workers: [],
          payouts: [],
          loading: false,
          error: getErrorMessage(err, pool),
          lastUpdated: null,
        });
      }
    };

    if (walletOrToken && pool) fetch();
  }, [walletOrToken, pool]);

  return data;
};
