import { decryptToken } from '../../utils/crypto';

const BASE_URL = 'https://api.powerpool.io/api/user?apiKey=';

const fetchUserData = async (encryptedKey) => {
  const apiKey = decryptToken(encryptedKey);
  const res = await fetch(`${BASE_URL}${apiKey}`);
  if (!res.ok) throw new Error('PowerPool API error');
  const data = await res.json();

  // Extract the root username key
  const userKey = Object.keys(data)[0];
  return data[userKey];
};


export const getDashboard = async (apiKey) => {
  const userData = await fetchUserData(apiKey);

  const algo = Object.keys(userData.hashrate || {})[0];
  const hashrate = userData.hashrate[algo] || {};

  return {
    currentHashrate: hashrate.hashrate || 0,
    hashrateAvg: hashrate.hashrate_avg || 0,
    estimatedEarnings: hashrate.estimated_24h_usd_revenue || 0,
    unpaid: userData.balances?.[0]?.balance || 0,
    poolStats: {
      hashrateUnit: hashrate.hashrate_units,
      avgUnit: hashrate.hashrate_avg_units,
      algo,
    },
  };
};

export const getWorkers = async (apiKey) => {
  const userData = await fetchUserData(apiKey);
  const algo = Object.keys(userData.workers || {})[0];
  return userData.workers[algo] || [];
};

export const getPayouts = async (apiKey) => {
  const userData = await fetchUserData(apiKey);
  return userData.payments || [];
};