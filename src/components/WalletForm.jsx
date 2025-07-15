// src/components/WalletForm.jsx
import { useState } from 'react';

const WalletForm = ({ onSubmit }) => {
  const [wallet, setWallet] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (wallet.trim() === '') return;
    onSubmit(wallet.trim());
    setWallet('');
  };

  return (
    <form onSubmit={handleSubmit} className="wallet-form">
      <input
        type="text"
        placeholder="Enter Ethermine Wallet Address"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
      />
      <button type="submit">Track</button>
    </form>
  );
};

export default WalletForm;
