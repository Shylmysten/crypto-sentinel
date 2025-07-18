const WorkerTable = ({ workers }) => {
  if (!workers?.length) {
    return <p className="text-green-300 font-mono text-sm mt-4">No active workers.</p>;
  }

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-black border border-green-500 text-green-300 font-mono text-sm">
        <thead className="bg-green-900 bg-opacity-20">
          <tr>
            <th className="py-2 px-4 text-left border-b border-green-500">Worker</th>
            <th className="py-2 px-4 text-left border-b border-green-500">Current Hashrate</th>
            <th className="py-2 px-4 text-left border-b border-green-500">Reported Hashrate</th>
            <th className="py-2 px-4 text-left border-b border-green-500">Status</th>
            <th className="py-2 px-4 text-left border-b border-green-500">Last Seen</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((worker, index) => (
            <tr key={index} className="hover:bg-green-800/10 transition">
              <td className="py-2 px-4 border-b border-green-700">{worker.name}</td>
              <td className="py-2 px-4 border-b border-green-700">{worker.currentHashrate?.toFixed(2)} MH/s</td>
              <td className="py-2 px-4 border-b border-green-700">{worker.reportedHashrate?.toFixed(2)} MH/s</td>
              <td className="py-2 px-4 border-b border-green-700">
                <span className={worker.online ? 'text-green-400' : 'text-red-400'}>
                  {worker.online ? 'Online' : 'Offline'}
                </span>
              </td>
              <td className="py-2 px-4 border-b border-green-700">{new Date(worker.lastSeen).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkerTable;
