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
        setData({
          dashboard: null,
          workers: [],
          payouts: [],
          loading: false,
          error: err.message || 'Failed to load data.',
          lastUpdated: null,
        });
      }
    };

    if (walletOrToken && pool) fetch();
  }, [walletOrToken, pool]);

  return data;
};
