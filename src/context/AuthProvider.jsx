// src/context/AuthProvider.jsx
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [settings, setSettings] = useState(null); // NEW: for wallet/token + pool

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);

      if (firebaseUser) {
        try {
          const docRef = doc(db, 'users', firebaseUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            setSettings(userData.settings || null);
          } else {
            setSettings(null);
          }
        } catch (error) {
          console.error('Error loading settings:', error);
          setSettings(null);
        }
      } else {
        setSettings(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, authLoading, settings, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

