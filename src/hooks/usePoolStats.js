// src/hooks/usePoolStats.js
import { useEffect, useState, useRef, useCallback } from 'react';
import { getPoolService } from '../services/poolService';

export const usePoolStats = (walletOrToken, pool) => {
  const [data, setData] = useState({
    dashboard: null,
    workers: [],
    payouts: [],
    loading: true,
    error: null,
    lastUpdated: null,
  });

  // Enhanced error handling function
  const getErrorMessage = (error, pool) => {
    const message = error.message?.toLowerCase() || '';
    
    // Network/Connection errors
    if (message.includes('network') || message.includes('fetch')) {
      return 'Network connection failed. Please check your internet and try again.';
    }
    
    // Authentication/Invalid wallet errors
    if (message.includes('401') || message.includes('unauthorized') || message.includes('invalid')) {
      return `Invalid ${pool === 'hiveos' || pool === 'powerpool' ? 'API token' : 'wallet address'}. Please check your credentials.`;
    }
    
    // Rate limiting
    if (message.includes('429') || message.includes('rate limit')) {
      return 'Too many requests. Please wait a moment and try again.';
    }
    
    // API unavailable
    if (message.includes('500') || message.includes('503')) {
      return `${pool} API is temporarily unavailable. Please try again later.`;
    }
    
    // Default fallback
    return `Failed to load ${pool} data. Please try again.`;
  };

  // Cache and performance utilities
  const cacheRef = useRef(new Map());
  const abortControllerRef = useRef(null);
  
  // Generate cache key for current request
  const getCacheKey = useCallback((wallet, pool) => {
    return `${pool}-${wallet?.substring(0, 10)}...`; // Safe cache key without full sensitive data
  }, []);
  
  // Check if cached data is still fresh (within 2 minutes)
  const isCacheFresh = useCallback((cachedData) => {
    const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes
    return cachedData && (Date.now() - cachedData.timestamp) < CACHE_DURATION;
  }, []);

  // Manual refresh function with debouncing
  const refreshData = useCallback(() => {
    if (walletOrToken && pool) {
      // Clear cache for this wallet/pool combination
      const cacheKey = getCacheKey(walletOrToken, pool);
      cacheRef.current.delete(cacheKey);
      
      // Trigger re-fetch
      setData(prev => ({ ...prev, loading: true, error: null }));
    }
  }, [walletOrToken, pool, getCacheKey]);

  useEffect(() => {
    const fetch = async () => {
      // Cancel any previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      const cacheKey = getCacheKey(walletOrToken, pool);
      const cachedData = cacheRef.current.get(cacheKey);
      
      // Return cached data if fresh
      if (isCacheFresh(cachedData)) {
        setData({
          ...cachedData.data,
          loading: false,
        });
        return;
      }

      // Create new abort controller for this request
      abortControllerRef.current = new AbortController();
      
      setData((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const api = getPoolService(pool);

        let dashboard, workers, payouts;

        if (pool === 'hiveos') {
          const token = walletOrToken;
          const farms = await api.getFarms(token);
          const rigs = await api.getRigs(token, farms[0].id);

          dashboard = {
            unpaid: rigs.reduce((sum, r) => sum + r.stats.unpaid, 0), // optional logic
            estimatedEarnings: 0,
            poolStats: {},
          };

          workers = rigs.map((r) => ({
            name: r.name,
            online: r.online,
            currentHashrate: r.hashrate,
            reportedHashrate: r.reportedHashrate || 0,
            lastSeen: r.updated_at * 1000,
          }));

          payouts = []; // HiveOS doesn’t expose payout data here
        } else {
          [dashboard, workers, payouts] = await Promise.all([
            api.getDashboard(walletOrToken),
            api.getWorkers(walletOrToken),
            api.getPayouts(walletOrToken),
          ]);
        }

        setData({
          dashboard,
          workers,
          payouts,
          loading: false,
          error: null,
          lastUpdated: new Date(),
        });
        
        // Cache the successful response
        cacheRef.current.set(cacheKey, {
          data: {
            dashboard,
            workers,
            payouts,
            loading: false,
            error: null,
            lastUpdated: new Date(),
          },
          timestamp: Date.now()
        });
      } catch (err) {
        // Don't set error state if request was aborted
        if (err.name === 'AbortError') {
          return;
        }
        
        // Enhanced logging for debugging - NO sensitive data
        console.error('Pool stats fetch error:', {
          pool,
          walletType: pool === 'hiveos' || pool === 'powerpool' ? 'API_TOKEN' : 'WALLET_ADDRESS',
          errorType: err.name || 'Unknown',
          errorMessage: err.message,
          timestamp: new Date().toISOString(),
          // Only log first line of stack trace to avoid exposing sensitive data
          stack: err.stack?.split('\n')[0]
        });

        setData({
          dashboard: null,
          workers: [],
          payouts: [],
          loading: false,
          error: getErrorMessage(err, pool),
          lastUpdated: null,
        });
      }
    };

    if (walletOrToken && pool) fetch();
    
    // Cleanup function to abort request on unmount/re-render
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [walletOrToken, pool, getCacheKey, isCacheFresh]);

  return { ...data, refreshData };
};
