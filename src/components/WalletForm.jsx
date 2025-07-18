// src/components/WalletForm.jsx
import { useState } from 'react';
import { db } from '../firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../context/useAuth';
import { isWalletValid } from '../utils/helpers';
import { POOL_META } from '../constants/pools';
import { v4 as uuidv4 } from 'uuid';
import { encryptToken } from '../utils/crypto';
import toast from 'react-hot-toast';


const WalletForm = ({ onSuccess }) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    pool: 'ethermine',
    value: '',
    label: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { pool, value, label } = form;
      const trimmed = value.trim();

      if (!isWalletValid(trimmed, pool)) {
        toast.error(`Invalid address/token format for ${pool}`);
        return; // This will skip to finally block and reset isSubmitting
      }

      const isTokenPool = pool === 'hiveos' || pool === 'powerpool';

      const newWallet = {
        id: uuidv4(),
        pool,
        type: isTokenPool ? 'token' : 'wallet',
        label: label || `${pool} ${isTokenPool ? 'Token' : 'Wallet'}`,
        ...(isTokenPool ? { token: encryptToken(trimmed) } : { address: trimmed }),
        active: false,
      };

      const userRef = doc(db, 'users', user.uid);
      const snapshot = await getDoc(userRef);
      const existing = snapshot.data()?.settings?.wallets || [];

      await setDoc(
        userRef,
        {
          settings: {
            wallets: [...existing, newWallet],
          },
        },
        { merge: true }
      );

      setForm({ pool: 'ethermine', value: '', label: '' });
      if (onSuccess) onSuccess(); // ✅ Refresh wallet list
      toast.success('Wallet/Token saved successfully!');
    } catch (error) {
      console.error('Error saving wallet/token:', error);
      toast.error('Failed to save wallet/token. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isTokenPool = form.pool === 'hiveos' || form.pool === 'powerpool';

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div>
        <label className="block text-sm mb-1 font-bold">Select Pool</label>
        <select
          id='pool'
          name="pool"
          value={form.pool}
          onChange={handleChange}
          className="bg-black text-green-300 border border-green-500 p-2 w-full rounded"
        >
          {Object.entries(POOL_META).map(([key, meta]) => (
            <option key={key} value={key}>{meta.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm mb-1 font-bold">
          {isTokenPool ? 'API Token' : 'Wallet Address'}
        </label>
        <input
          id='walletValue'
          name="value"
          type="text"
          value={form.value}
          onChange={handleChange}
          className="bg-black text-green-300 border border-green-500 p-2 w-full rounded"
        />
      </div>

      <div>
        <label className="block text-sm mb-1 font-bold">Optional Label</label>
        <input
          id='label'
          name="label"
          type="text"
          value={form.label}
          onChange={handleChange}
          className="bg-black text-green-300 border border-green-500 p-2 w-full rounded"
        />
      </div>


      <button
        type="submit"
        disabled={isSubmitting}
        className={`py-2 px-4 font-bold rounded transition ${
          isSubmitting 
            ? 'bg-gray-500 cursor-not-allowed text-gray-300'
            : 'bg-green-600 hover:bg-green-500 text-black'
        }`}
      >
        {isSubmitting ? 'Saving...' : 'Save Wallet/Token'}
      </button>
    </form>
  );
};

export default WalletForm;
