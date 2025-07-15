// src/hooks/usePoolStats.js
import { useEffect, useState } from 'react';
import { getPoolService } from '../services/poolService';

export const usePoolStats = (wallet, pool) => {
  const [data, setData] = useState({
    dashboard: null,
    workers: [],
    payouts: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetch = async () => {
      setData((prev) => ({ ...prev, loading: true }));
      try {
        const api = getPoolService(pool);
        const [dashboard, workers, payouts] = await Promise.all([
          api.getDashboard(wallet),
          api.getWorkers(wallet),
          api.getPayouts(wallet),
        ]);
        setData({ dashboard, workers, payouts, loading: false, error: null });
      } catch (err) {
        setData({ dashboard: null, workers: [], payouts: [], loading: false, error: err.message });
      }
    };

    if (wallet && pool) fetch();
  }, [wallet, pool]);

  return data;
};
