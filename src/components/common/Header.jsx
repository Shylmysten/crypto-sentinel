import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import sentinelLogo from '/sentinel_logo.png';

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  if (isAuthPage) return null;

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-black bg-opacity-90 border-b border-green-400">
      {/* Left: Logo + Title */}
      <div className="flex items-center gap-4">
        <img src={sentinelLogo} alt="Sentinel Logo" className="w-10 h-10 pulse-matrix" />
        <h1 className="text-green-400 text-xl font-mono tracking-wide">Crypto Sentinel</h1>
      </div>

      {/* Right: Nav + User */}
      {user && (
        <div className="flex items-center gap-6 text-green-300 font-mono text-sm">
          {/* Navigation Links */}
          <nav className="flex gap-4">
            <Link
              to="/dashboard"
              className="hover:text-green-400 transition border-b-2 border-transparent hover:border-green-400"
            >
              Dashboard
            </Link>
            <Link
              to="/settings"
              className="hover:text-green-400 transition border-b-2 border-transparent hover:border-green-400"
            >
              Settings
            </Link>
          </nav>

          {/* User Email */}
          <span className="truncate max-w-[150px]">{user.email}</span>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="text-xs border border-green-400 px-3 py-1 rounded hover:bg-green-600 hover:text-black transition"
          >
            Log Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;