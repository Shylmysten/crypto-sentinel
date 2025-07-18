// src/services/pools/ethermineAPI.js
import axios from 'axios';

const base = 'https://api.ethermine.org/miner';

export const getDashboard = async (wallet) => {
  const res = await axios.get(`${base}/${wallet}/dashboard`);
  const data = res.data?.data?.currentStatistics;
  
  return {
    ...data,
    unit: 'ETH' // Ethermine always uses ETH
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