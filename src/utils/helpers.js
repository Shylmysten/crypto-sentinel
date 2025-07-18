// src/utils/helpers.js

/**
 * Formats a hashrate value into a human-readable string with appropriate units
 * @param {number} hashrate - The hashrate value in H/s
 * @returns {string} Formatted hashrate string (e.g., "1.23 GH/s", "456.78 MH/s")
 * @example
 * formatHashrate(1234567890) // Returns "1.23 GH/s"
 * formatHashrate(1234567) // Returns "1.23 MH/s"
 * formatHashrate(1234) // Returns "1.23 kH/s"
 */
export const formatHashrate = (hashrate) => {
  if (typeof hashrate !== 'number') return 'N/A';
  if (hashrate >= 1e9) return (hashrate / 1e9).toFixed(2) + ' GH/s';
  if (hashrate >= 1e6) return (hashrate / 1e6).toFixed(2) + ' MH/s';
  if (hashrate >= 1e3) return (hashrate / 1e3).toFixed(2) + ' kH/s';
  return hashrate.toFixed(2) + ' H/s';
};

/**
 * Validates wallet address or API token format for specific mining pools
 * @param {string} wallet - The wallet address or API token to validate
 * @param {string} pool - The mining pool identifier ('ethermine', 'flexpool', 'f2pool', 'hiveos', 'powerpool')
 * @returns {boolean} True if the wallet/token format is valid for the specified pool
 * @example
 * isWalletValid('0x1234567890123456789012345678901234567890', 'ethermine') // Returns true
 * isWalletValid('invalid-address', 'ethermine') // Returns false
 * isWalletValid('long-api-token-string-here', 'hiveos') // Returns true
 */
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