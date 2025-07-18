// src/utils/firestoreHelpers.js
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

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