// src/utils/helpers.js
export const formatHashrate = (hashrate) => {
  if (typeof hashrate !== 'number') return 'N/A';
  if (hashrate >= 1e9) return (hashrate / 1e9).toFixed(2) + ' GH/s';
  if (hashrate >= 1e6) return (hashrate / 1e6).toFixed(2) + ' MH/s';
  if (hashrate >= 1e3) return (hashrate / 1e3).toFixed(2) + ' kH/s';
  return hashrate.toFixed(2) + ' H/s';
};

export const isWalletValid = (wallet, pool) => {
  if (!wallet) return false;

  const trimmed = wallet.trim();

  switch (pool) {
    case 'ethermine':
    case 'flexpool':
    case 'f2pool':
      return /^0x[a-fA-F0-9]{40}$/.test(trimmed);

    case 'hiveos':
    case 'powerpool':
      return trimmed.length >= 30; // assume minimum API key length - May need to adjust this length later

    default:
      return true;
  }
};