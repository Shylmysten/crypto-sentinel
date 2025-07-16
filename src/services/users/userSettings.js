import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export const saveUserSettings = async (uid, settings) => {
  const ref = doc(db, 'users', uid);
  await setDoc(ref, { ...settings, updatedAt: Date.now() }, { merge: true });
};

export const loadUserSettings = async (uid) => {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
};
