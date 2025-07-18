// src/utils/crypto.js
import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_API_ENCRYPTION_KEY;

export const encryptToken = (text) => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

export const decryptToken = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
