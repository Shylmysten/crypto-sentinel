const WorkerTable = ({ workers }) => {
  if (!workers?.length) {
    return <p className="text-green-300 font-mono text-sm mt-4">No active workers.</p>;
  }

  return (
      <div className="mt-6">
        <h2 className="text-green-400 font-mono text-lg mb-2">Pool Stats</h2>
        {/* Desktop view */}
        <div className="hidden md:block overflow-x-auto mt-6">
          <table className="min-w-full bg-black border border-green-500 text-green-300 font-mono text-sm">
            <thead className="bg-green-900 bg-opacity-20">
              <tr>
                <th className="py-2 px-4 text-left border-b border-green-500">Worker Name | Script</th>
                <th className="py-2 px-4 text-left border-b border-green-500">Current Hashrate</th>
                <th className="py-2 px-4 text-left border-b border-green-500">Reported Hashrate</th>
                <th className="py-2 px-4 text-left border-b border-green-500">Status</th>

              </tr>
            </thead>
            <tbody>
              {workers.map((worker, index) => (
                <tr key={index} className="hover:bg-green-800/10 transition">
                  <td className="py-2 px-4 border-b border-green-700">{worker.name} | {worker.algorithm}</td>
                  <td className="py-2 px-4 border-b border-green-700">{worker.hashrate?.toFixed(2)} {worker.hashrate_units}</td>
                  <td className="py-2 px-4 border-b border-green-700">{worker.hashrate_avg?.toFixed(2)} {worker.hashrate_avg_units}</td>
                  <td className="py-2 px-4 border-b border-green-700">
                    <span className={worker.online ? 'text-green-400' : 'text-red-400'}>
                      {worker.online ? '🟢 Online' : '🔴 Offline'}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card Layout */}
        <div className="md:hidden space-y-4 mt-6">
          {workers.map((worker, index) => (
            <div key={index} className="bg-black border border-green-500 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-green-400 font-mono text-sm font-bold">{worker.name}</h3>
                <span className={worker.online ? 'text-green-400' : 'text-red-400'}>
                  {worker.online ? '🟢' : '🔴'}
                </span>
              </div>
              <div className="space-y-1 text-green-300 font-mono text-xs">
                <div>Algorithm: {worker.algorithm}</div>
                <div>Current: {worker.hashrate?.toFixed(2)} {worker.hashrate_units}</div>
                <div>Reported: {worker.hashrate_avg?.toFixed(2)} {worker.hashrate_avg_units}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default WorkerTable;
