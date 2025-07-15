// src/App.jsx
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import WalletForm from './components/WalletForm';
import PoolSelector from './components/PoolSelector';
import Dashboard from './pages/Dashboard';

function App() {
  const [wallet, setWallet] = useState(null);
  const [pool, setPool] = useState('ethermine'); // default pool

  return (
    <div className="app-container">
      <h1>Mining Pool Monitor</h1>
      <PoolSelector onSelect={setPool} />
      <WalletForm onSubmit={setWallet} />

      <Routes>
        <Route
          path="/dashboard"
          element={
            wallet ? (
              <Dashboard wallet={wallet} pool={pool} />
            ) : (
              <p>Enter a wallet to view dashboard.</p>
            )
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
}

export default App;
