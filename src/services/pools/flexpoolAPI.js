// src/services/pools/flexpoolAPI.js
import axios from 'axios';

const base = 'https://api.flexpool.io/v2/miner';

export const getDashboard = async (wallet) => {
  const res = await axios.get(`${base}/eth/${wallet}/dashboard`);
  const data = res.data?.result?.currentStatistics;
  
  // Get pool stats from Flexpool's pool endpoint
  let poolStats = {};
  try {
    const poolStatsRes = await axios.get('https://api.flexpool.io/v2/pool/eth/stats');
    const poolData = poolStatsRes.data?.result;
    if (poolData) {
      poolStats = {
        minPayout: 0.01, // Flexpool ETH minimum is 0.01 ETH
        payoutUnit: 'ETH',
        networkHashrate: poolData.hashrate ? (poolData.hashrate / 1e12) : undefined, // Convert to TH/s
        networkHashrateUnit: 'TH/s',
        fee: 0.5, // Flexpool fee is 0.5%
        blocksFound: poolData.blocksMined || 0,
      };
    }
  } catch (poolStatsError) {
    console.warn('Could not fetch Flexpool pool stats:', poolStatsError.message);
    // Fallback to default values
    poolStats = {
      minPayout: 0.01,
      payoutUnit: 'ETH',
      fee: 0.5,
    };
  }
  
  return {
    ...data,
    unit: 'ETH', // Flexpool ETH endpoint always uses ETH
    poolStats
  };
};

export const getWorkers = async (wallet) => {
  const res = await axios.get(`${base}/eth/${wallet}/workers`);
  return res.data?.result || [];
};

export const getPayouts = async (wallet) => {
  const res = await axios.get(`${base}/eth/${wallet}/payouts`);
  return res.data?.result || [];
};