// src/services/pools/ethermineAPI.js
import axios from 'axios';

const base = 'https://api.ethermine.org/miner';

export const getDashboard = async (wallet) => {
  const res = await axios.get(`${base}/${wallet}/dashboard`);
  const data = res.data?.data?.currentStatistics;
  
  // Get pool stats from Ethermine's poolStats endpoint
  let poolStats = {};
  try {
    const poolStatsRes = await axios.get('https://api.ethermine.org/poolStats');
    const poolData = poolStatsRes.data?.data;
    if (poolData) {
      poolStats = {
        minPayout: poolData.minPayout ? poolData.minPayout / 1e18 : 0.1, // Convert from wei to ETH
        payoutUnit: 'ETH',
        networkHashrate: poolData.poolStats?.hashRate ? (poolData.poolStats.hashRate / 1e12) : undefined, // Convert to TH/s
        networkHashrateUnit: 'TH/s',
        fee: 1.0, // Ethermine fee is 1%
        difficulty: poolData.poolStats?.difficulty,
        difficultyUnit: '',
        blocksFound: poolData.poolStats?.totalBlocks || 0,
      };
    }
  } catch (poolStatsError) {
    console.warn('Could not fetch Ethermine pool stats:', poolStatsError.message);
    // Fallback to default values
    poolStats = {
      minPayout: 0.1,
      payoutUnit: 'ETH',
      fee: 1.0,
    };
  }
  
  return {
    ...data,
    unit: 'ETH', // Ethermine always uses ETH
    poolStats
  };
};

export const getWorkers = async (wallet) => {
  const res = await axios.get(`${base}/${wallet}/workers`);
  return res.data?.data;
};

export const getPayouts = async (wallet) => {
  const res = await axios.get(`${base}/${wallet}/payouts`);
  return res.data?.data;
};