const PoolStatsTable = ({ stats }) => {
  if (!stats) return null;

  const rows = [
    { label: 'Latency', value: `${stats.latency} ms` },
    { label: 'Minimum Payout', value: `${stats.minPayout} ETH` },
    { label: 'Network Hashrate', value: `${stats.networkHashrate} TH/s` },
    { label: 'Block Time', value: `${stats.blockTime} sec` },
  ];

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
