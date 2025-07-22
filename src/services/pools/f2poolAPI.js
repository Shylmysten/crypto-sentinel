// src/services/pools/f2poolAPI.js

// (⚠️ No public REST API — placeholder)
export const getDashboard = async () => {
  // Since F2Pool doesn't have a public API, provide basic pool info
  return {
    unpaid: 0,
    currentHashrate: 0,
    averageHashrate: 0,
    unit: 'BTC',
    poolStats: {
      minPayout: 0.005, // F2Pool BTC minimum payout
      payoutUnit: 'BTC',
      fee: 2.5, // F2Pool typical fee
    }
  };
};

export const getWorkers = async () => {
  return [];
};

export const getPayouts = async () => {
  return [];
};