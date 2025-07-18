// src/services/poolService.js
import * as ethermineAPI from './pools/ethermineAPI';
import * as flexpoolAPI from './pools/flexpoolAPI';
import * as f2poolAPI from './pools/f2poolAPI';
import * as hiveonAPI from './pools/hiveosAPI';
import * as powerpoolAPI from './pools/powerpoolAPI'; // ✅ Add this

export const getPoolService = (pool) => {
  switch (pool) {
    case 'ethermine':
      return ethermineAPI;
    case 'flexpool':
      return flexpoolAPI;
    case 'f2pool':
      return f2poolAPI;
    case 'hiveos':
      return hiveonAPI;
    case 'powerpool': // ✅ Register here
      return powerpoolAPI;
    default:
      throw new Error(`Unsupported pool: ${pool}`);
  }
};