// src/components/WorkerList.jsx
import { formatHashrate } from "../../utils/helpers";

const WorkerList = ({ workers }) => {
  if (!Array.isArray(workers) || workers.length === 0) {
    return <p className="text-green-300 font-mono text-sm mt-4">No workers found.</p>;
  }

  return (
    <div className="worker-list mt-6">
      <h3 className="text-lg font-bold text-green-400 mb-2">Worker Status</h3>
      <ul className="text-green-300 font-mono text-sm space-y-1">
        {workers.map((w, idx) => {
          const name = w.worker || w.name || `Worker-${idx + 1}`;
          const online = w.isOnline ?? w.online ?? w.status === 'online';
          const hashrate = w.currentHashrate ?? w.hashrate ?? 0;

          return (
            <li key={name}>
              <strong>{name}</strong> — {online ? '🟢 Online' : '🔴 Offline'} — {formatHashrate(hashrate)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default WorkerList;

