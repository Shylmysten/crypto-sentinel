// src/pages/Login.jsx
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md w-full bg-black bg-opacity-70 border border-green-400 rounded-lg shadow-lg p-6 fade-in-matrix">
      <div className="bg-black bg-opacity-70 p-10 rounded-lg shadow-lg w-full max-w-md">

        <h2 className="text-xl mb-4 font-semibold text-center">Sign In</h2>
        {error && <p className="text-red-400 mb-2 text-sm">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-green-400 text-sm mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-black border border-green-500 text-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-green-400 text-sm mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-black border border-green-500 text-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-2 px-4 bg-green-400 text-black font-mono font-bold rounded hover:bg-green-300 hover:shadow-[0_0_8px_#0f0] transition"
          >
            Log In
          </button>

          <p className="text-xs text-green-300 mt-4 text-center">
            Don’t have an account?{' '}
            <Link to="/register" className="underline hover:text-green-200">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>

  );
};

export default Login;
