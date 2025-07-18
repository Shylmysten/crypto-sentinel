// src/hooks/usePoolMeta.js
import { useMemo } from 'react';
import { POOL_META } from '../constants/pools';

export const usePoolMeta = (pool) => {
  return useMemo(() => ({
    name: POOL_META[pool]?.name || pool,
    icon: POOL_META[pool]?.icon,
    url: POOL_META[pool]?.url,
    hasIcon: !!POOL_META[pool]?.icon
  }), [pool]);
};