// src/services/pools/flexpoolAPI.js
import axios from 'axios';

const base = 'https://api.flexpool.io/v2/miner';

export const getDashboard = async (wallet) => {
  const res = await axios.get(`${base}/eth/${wallet}/dashboard`);
  const data = res.data?.result?.currentStatistics;
  
  return {
    ...data,
    unit: 'ETH' // Flexpool ETH endpoint always uses ETH
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