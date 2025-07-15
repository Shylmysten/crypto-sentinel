// src/services/ethermineAPI.js
import axios from 'axios';

const base = 'https://api.ethermine.org/miner';

export const fetchEthermineStats = async (wallet) => {
  try {
    const response = await axios.get(
      `https://api.ethermine.org/miner/${wallet}/dashboard`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Ethermine stats:", error);
    return null;
  }
};

export const fetchDashboard = (wallet) =>
  axios.get(`${base}/${wallet}/dashboard`).then((res) => res.data);

export const fetchWorkers = (wallet) =>
  axios.get(`${base}/${wallet}/workers`).then((res) => res.data);

export const fetchPayouts = (wallet) =>
  axios.get(`${base}/${wallet}/payouts`).then((res) => res.data);