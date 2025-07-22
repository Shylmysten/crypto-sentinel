const PoolStatsTable = ({ stats }) => {
  if (!stats) return null;
 console.log('Rendering PoolStatsTable with stats:', stats);
  // Helper function to format values safely
  const formatValue = (value, unit = '', fallback = 'N/A') => {
    if (value === null || value === undefined) return fallback;
    return `${value}${unit ? ` ${unit}` : ''}`;
  };

  // Build rows dynamically based on available data
  const rows = [];

  // Standard pool stats with dynamic units
  if (stats.latency !== undefined) {
    rows.push({ 
      label: 'Latency', 
      value: formatValue(stats.latency, 'ms') 
    });
  }

  if (stats.minPayout !== undefined) {
    rows.push({ 
      label: 'Minimum Payout', 
      value: formatValue(stats.minPayout, stats.payoutUnit || 'ETH') 
    });
  }

  if (stats.networkHashrate !== undefined) {
    rows.push({ 
      label: 'Network Hashrate', 
      value: formatValue(stats.networkHashrate, stats.networkHashrateUnit || 'TH/s') 
    });
  }

  if (stats.blockTime !== undefined) {
    rows.push({ 
      label: 'Block Time', 
      value: formatValue(stats.blockTime, 'sec') 
    });
  }

  // PowerPool specific stats
  if (stats.hashrateUnit) {
    //console.log('Using hashrateUnit:', stats.hashrateUnit);
    rows.push({ 
      label: 'Hashrate Unit', 
      value: stats.hashrateUnit 
    });
  }

  if (stats.avgUnit) {
    rows.push({ 
      label: 'Average Hashrate Unit', 
      value: stats.avgUnit 
    });
  }

  if (stats.algo) {
    rows.push({ 
      label: 'Algorithm', 
      value: stats.algo.toUpperCase() 
    });
  }

  // Pool difficulty (if available)
  if (stats.difficulty !== undefined) {
    rows.push({ 
      label: 'Pool Difficulty', 
      value: formatValue(stats.difficulty, stats.difficultyUnit || '') 
    });
  }

  // Pool fee (if available)
  if (stats.fee !== undefined) {
    rows.push({ 
      label: 'Pool Fee', 
      value: formatValue(stats.fee, '%') 
    });
  }

  // Blocks found (if available)
  if (stats.blocksFound !== undefined) {
    rows.push({ 
      label: 'Blocks Found', 
      value: formatValue(stats.blocksFound) 
    });
  }

  // If no relevant stats are available, don't render the table
  if (rows.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <h2 className="text-green-400 font-mono text-lg mb-2">Pool Stats</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-black border border-green-500 text-green-300 font-mono text-sm">
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-green-800/10 transition">
                <td className="py-2 px-4 border-b border-green-700 font-bold">{row.label}</td>
                <td className="py-2 px-4 border-b border-green-700">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PoolStatsTable;
