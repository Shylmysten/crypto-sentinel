// src/pages/Settings.jsx
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../context/useAuth';
import usePageTitle from '../hooks/usePageTitle';
import WalletForm from '../components/WalletForm';
import WalletManager from '../components/WalletManager';

const Settings = () => {
  usePageTitle('User Settings');
  const { user } = useAuth();
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWallets = async () => {
    if (!user) return;
    const userDoc = doc(db, 'users', user.uid);
    const snapshot = await getDoc(userDoc);
    const saved = snapshot.data()?.settings?.wallets || [];
    setWallets(saved);
    setLoading(false);
  };



  useEffect(() => {
    fetchWallets();
  }, [user]);

  return (
    <div className="max-w-3xl mx-auto p-4 text-green-300 font-mono fade-in-matrix">
      <h2 className="text-2xl font-bold mb-4 text-green-400">User Settings</h2>
      <p className="mb-6 text-sm">Manage your tracked wallets or tokens by mining pool.</p>

      <WalletForm onSuccess={fetchWallets} />

      <WalletManager
        wallets={wallets}
        loading={loading}
        onRefresh={fetchWallets}
      />
    </div>
  );
};

export default Settings;
