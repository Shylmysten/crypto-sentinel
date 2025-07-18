const RewardsTable = ({ rewards, unit = 'ETH' }) => {
  if (!rewards?.length) {
    return <p className="text-green-300 font-mono text-sm mt-4">No rewards history available.</p>;
  }

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-black border border-green-500 text-green-300 font-mono text-sm">
        <thead className="bg-green-900 bg-opacity-20">
          <tr>
            <th className="py-2 px-4 border-b border-green-500 text-left">Date</th>
            <th className="py-2 px-4 border-b border-green-500 text-left">Reward ({unit})</th>
          </tr>
        </thead>
        <tbody>
          {rewards.map((reward, idx) => (
            <tr key={idx} className="hover:bg-green-800/10 transition">
              <td className="py-2 px-4 border-b border-green-700">
                {new Date(reward.timestamp).toLocaleString()}
              </td>
              <td className="py-2 px-4 border-b border-green-700">
                {parseFloat(reward.amount).toFixed(4)} {unit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RewardsTable;