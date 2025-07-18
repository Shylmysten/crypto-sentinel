// src/utils/firestoreHelpers.js
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

/**
 * Adds a new wallet entry to a user's wallet collection in Firestore
 * @param {string} uid - The Firebase user ID
 * @param {Object} newWalletEntry - The wallet entry object to add
 * @param {string} newWalletEntry.pool - Mining pool identifier
 * @param {string} newWalletEntry.address - Wallet address (for wallet-based pools)
 * @param {string} [newWalletEntry.token] - Encrypted API token (for token-based pools)
 * @param {string} [newWalletEntry.label] - Optional display label
 * @returns {Promise<void>} Resolves when the wallet is successfully added
 * @throws {Error} If Firestore operation fails
 * @example
 * await addWalletToUser('user123', {
 *   pool: 'ethermine',
 *   address: '0x1234...',
 *   label: 'My Mining Wallet'
 * })
 */
export const addWalletToUser = async (uid, newWalletEntry) => {
  const userDocRef = doc(db, 'users', uid);
  const userDocSnap = await getDoc(userDocRef);

  let wallets = [];

  if (userDocSnap.exists()) {
    wallets = userDocSnap.data()?.settings?.wallets || [];
  }

  const updatedWallets = [...wallets, { id: Date.now().toString(), ...newWalletEntry }];

  await setDoc(
    userDocRef,
    {
      settings: {
        wallets: updatedWallets
      }
    },
    { merge: true }
  );
};