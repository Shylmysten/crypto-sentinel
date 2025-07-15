// src/components/WorkerList.jsx
const WorkerList = ({ workers }) => {
  if (!Array.isArray(workers) || workers.length === 0) {
    return <p>No workers found.</p>;
  }

  return (
    <div className="worker-list">
      <h3>Worker Status</h3>
      <ul>
        {workers.map((w) => (
          <li key={w.worker}>
            <strong>{w.worker}</strong> — {w.isOnline ? '🟢 Online' : '🔴 Offline'} —{' '}
            {w.currentHashrate.toFixed(2)} H/s
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkerList;
