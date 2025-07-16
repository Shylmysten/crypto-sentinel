// src/App.jsx
import { useEffect, useState } from 'react';
import { useAuth } from './context/AuthContext';
import AppRoutes from './AppRoutes';
import PoolSelector from './components/PoolSelector';
import WalletForm from './components/WalletForm';
import sentinelLogo from '/sentinel_logo.png';
import MatrixCanvas from './components/MatrixCanvas';

function App() {
  const { user } = useAuth();
  const [wallet, setWallet] = useState(null);
  const [pool, setPool] = useState('ethermine'); // default pool
  const [showMatrix, setShowMatrix] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('matrixRain');
    if (saved !== null) setShowMatrix(saved === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem('matrixRain', showMatrix);
  }, [showMatrix]);

  return (
    <div className={`relative min-h-screen ${showMatrix ? '' : 'bg-black'}`}>
      {showMatrix && <MatrixCanvas />}

      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setShowMatrix(prev => !prev)}
          className={`relative inline-flex items-center px-4 py-2 rounded-full text-xs font-mono transition duration-300 hover:shadow-[0_0_8px_#0f0]
            ${showMatrix
              ? 'bg-green-400 text-black shadow-green-400'
              : 'bg-gray-800 text-green-400 border border-green-400'}`}
        >
          <span className="relative z-10">
            {showMatrix ? '⏻ Rain On' : '⭘ Rain Off'}
          </span>
        </button>

      </div>
      <div className="matrix-bg min-h-screen text-green-400 font-mono">
        

        <div className="flex flex-col items-center py-6">
          <img src={sentinelLogo} alt="Crypto Sentinel" className="w-24 mx-auto mb-6 pulse-matrix" />
          <h1 className="text-2xl md:text-4xl font-bold tracking-widest">CRYPTO SENTINEL</h1>

          {user && (
            <div className="mt-6 w-full max-w-xl">
              <PoolSelector onSelect={setPool} />
              <WalletForm onSubmit={setWallet} />
            </div>
          )}
        </div>

        <div className="flex justify-center mt-8">
          <AppRoutes wallet={wallet} pool={pool} />
        </div>
      </div>
    </div>
  );
}

export default App;
