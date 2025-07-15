// src/components/PoolSelector.jsx
import { useState } from 'react';

const POOLS = [
  { name: 'Ethermine', value: 'ethermine' },
  { name: 'Flexpool', value: 'flexpool' },
  { name: 'F2Pool', value: 'f2pool' },
  // Add more as you integrate them
];

const PoolSelector = ({ onSelect }) => {
  const [selected, setSelected] = useState(POOLS[0].value);

  const handleChange = (e) => {
    const pool = e.target.value;
    setSelected(pool);
    onSelect(pool);
  };

  return (
    <div className="pool-selector">
      <label htmlFor="pool">Select Pool:</label>
      <select id="pool" value={selected} onChange={handleChange}>
        {POOLS.map((pool) => (
          <option key={pool.value} value={pool.value}>
            {pool.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PoolSelector;
