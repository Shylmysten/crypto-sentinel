// src/components/WalletManager.jsx
import { useState } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../context/useAuth';
import { encryptToken } from '../utils/crypto'; // assuming you have this helper

const WalletManager = ({ wallets, loading, onRefresh }) => {
  const { user } = useAuth();
  const [editingId, setEditingId] = useState(null);
  const [newToken, setNewToken] = useState('');

  const setActiveWallet = async (id) => {
    const updated = wallets.map((w) => ({ ...w, active: w.id === id }));
    await updateDoc(doc(db, 'users', user.uid), {
      'settings.wallets': updated,
    });
    onRefresh();
  };

  const deleteWallet = async (id) => {
    const filtered = wallets.filter((w) => w.id !== id);
    await updateDoc(doc(db, 'users', user.uid), {
      'settings.wallets': filtered,
    });
    onRefresh();
  };

  const saveNewToken = async (id) => {
    const encrypted = encryptToken(newToken);
    const updated = wallets.map((w) =>
      w.id === id ? { ...w, token: encrypted } : w
    );
    await updateDoc(doc(db, 'users', user.uid), {
      'settings.wallets': updated,
    });
    setEditingId(null);
    setNewToken('');
    onRefresh();
  };

  if (loading) return <p className="text-green-300">Loading credentials...</p>;
  if (wallets.length === 0) return <p>No credentials saved.</p>;

  return (
    <ul className="space-y-4 mt-6">
      {wallets.map((cred) => (
        <li key={cred.id} className="border border-green-500 p-4 rounded bg-black bg-opacity-50">
          <p><strong>Pool:</strong> {cred.pool}</p>
          <p><strong>Type:</strong> {cred.type}</p>

          {cred.type === 'token' ? (
            editingId === cred.id ? (
              <div className="mt-2 space-y-2">
                <input
                  type="text"
                  placeholder="Enter new token"
                  value={newToken}
                  onChange={(e) => setNewToken(e.target.value)}
                  className="bg-black text-green-300 border border-green-500 p-2 w-full rounded placeholder-green-500"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => saveNewToken(cred.id)}
                    className="bg-green-600 text-black font-bold px-3 py-1 rounded hover:bg-green-500"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setNewToken('');
                    }}
                    className="text-red-400 hover:underline text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p><strong>Token:</strong> ✅ Saved</p>
                <div className="mt-2 flex gap-3">
                  <button
                    onClick={() => setEditingId(cred.id)}
                    className="text-yellow-300 hover:underline text-sm"
                    aria-label={`Change token for ${cred.pool} ${cred.type}`}
                  >
                    🔄 Change
                  </button>
                  <button
                    onClick={() => deleteWallet(cred.id)}
                    className="text-red-400 hover:underline text-sm"
                    aria-label={`Delete ${cred.pool} ${cred.type}`}
                  >
                    🗑 Delete
                  </button>
                </div>
              </>
            )
          ) : (
            <>
              <p><strong>Address:</strong> {cred.address}</p>
              <div className="mt-2 flex gap-3">
                <button
                  onClick={() => setActiveWallet(cred.id)}
                  className={`px-3 py-1 rounded text-sm font-bold transition ${
                    cred.active
                      ? 'bg-green-500 text-black'
                      : 'border border-green-500 hover:bg-green-500 hover:text-black'
                  }`}
                >
                  {cred.active ? 'Active' : 'Set Active'}
                </button>
                <button
                  onClick={() => deleteWallet(cred.id)}
                  className="text-red-400 hover:underline text-sm"
                >
                  🗑 Delete
                </button>
              </div>
            </>
          )}

          {cred.label && <p className="mt-2"><strong>Label:</strong> {cred.label}</p>}
        </li>
      ))}
    </ul>
  );
};

export default WalletManager;
