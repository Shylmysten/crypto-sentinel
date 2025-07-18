// src/App.jsx
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Header from './components/common/Header';
import sentinelLogo from '/sentinel_logo.png';
import MatrixCanvas from './components/MatrixCanvas';

function App() {
  const location = useLocation();
  const [showMatrix, setShowMatrix] = useState(true);
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';


  useEffect(() => {
    const saved = localStorage.getItem('matrixRain');
    if (saved !== null) setShowMatrix(saved === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem('matrixRain', showMatrix);
  }, [showMatrix]);

  return (
    <div className={`relative min-h-screen ${!isAuthPage ? 'bg-black' : ''}`}>
      {/* ✅ Show Matrix rain ONLY on login/register */}
      {isAuthPage && showMatrix && <MatrixCanvas />}

      {/* 🟢 Add Header */}
      <Header />

      {/* 🟩 Matrix toggle button (optional) */}
      {isAuthPage && (
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={() => setShowMatrix((prev) => !prev)}
            className={`relative inline-flex items-center px-4 py-2 rounded-full text-xs font-mono transition duration-300 
              ${showMatrix
                ? 'bg-green-400 text-black shadow-green-400'
                : 'bg-gray-800 text-green-400 border border-green-400'}`}
            aria-label={`Turn matrix rain ${showMatrix ? 'off' : 'on'}`}
          >
            {showMatrix ? '⏻ Rain On' : '⭘ Rain Off'}
          </button>
        </div>
      )}
     
      <div className="matrix-bg min-h-screen text-green-400 font-mono">
        <div className="flex flex-col items-center py-6">
          <img src={sentinelLogo} alt="Crypto Sentinel" className="w-24 mx-auto mb-6 pulse-matrix" />
          <h1 className="text-2xl md:text-4xl font-bold tracking-widest">CRYPTO SENTINEL</h1>
        </div>

        <div className="flex justify-center mt-8">
          <AppRoutes  />
        </div>
      </div>
    </div>
  );
}

export default App;
