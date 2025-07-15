// src/services/poolService.js
import * as ethermine from './pools/ethermineAPI';
import * as flexpool from './pools/flexpoolAPI';
import * as f2pool from './pools/f2poolAPI';

const pools = {
  ethermine,
  flexpool,
  f2pool,
};

export const getPoolService = (poolName) => {
  const service = pools[poolName];
  if (!service) throw new Error(`Unsupported pool: ${poolName}`);
  return service;
};
