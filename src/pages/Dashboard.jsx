// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../context/useAuth';
import usePageTitle from '../hooks/usePageTitle';
import DashboardCard from '../components/dashboard/DashboardCard';

const Dashboard = () => {
  usePageTitle('Dashboard');
  const { user } = useAuth();
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallets = async () => {
      if (!user) return;
      const userDoc = doc(db, 'users', user.uid);
      const snapshot = await getDoc(userDoc);
      const saved = snapshot.data()?.settings?.wallets || [];
      setWallets(saved);
      setLoading(false);
    };

    fetchWallets();
  }, [user]);

  if (loading) return <p className="text-green-300">Loading mining data...</p>;

  if (!wallets.length) {
    return <p className="text-green-300">No wallets or tokens saved. Add one in Settings.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-10">
      <h2 className="text-2xl font-bold text-green-400 mb-6">Your Mining Dashboard</h2>
      {wallets.map((cred) => (
        <DashboardCard
          key={cred.id}
          walletOrToken={cred.address || cred.token}
          pool={cred.pool}
          label={cred.label}
        />
      ))}
    </div>
  );
};

export default Dashboard;