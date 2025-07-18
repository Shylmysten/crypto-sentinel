// src/utils/crypto.js
import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_API_ENCRYPTION_KEY;

/**
 * Encrypts a plain text string using AES encryption
 * @param {string} text - The plain text to encrypt (typically an API token)
 * @returns {string} The encrypted cipher text
 * @throws {Error} If SECRET_KEY environment variable is not set or input is invalid
 * @example
 * const encrypted = encryptToken('my-secret-api-token')
 * // Returns encrypted string like "U2FsdGVkX1+..."
 */
export const encryptToken = (text) => {
  if (!SECRET_KEY) {
    throw new Error('VITE_API_ENCRYPTION_KEY environment variable is required');
  }
  if (!text || typeof text !== 'string') {
    throw new Error('Text to encrypt must be a non-empty string');
  }
  try {
    return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
  } catch (error) {
    throw new Error(`Encryption failed: ${error.message}`);
  }
};

/**
 * Decrypts an encrypted cipher text back to plain text
 * @param {string} cipherText - The encrypted cipher text to decrypt
 * @returns {string} The decrypted plain text
 * @throws {Error} If SECRET_KEY environment variable is not set, input is invalid, or decryption fails
 * @example
 * const decrypted = decryptToken('U2FsdGVkX1+...')
 * // Returns original plain text like "my-secret-api-token"
 */
export const decryptToken = (cipherText) => {
  if (!SECRET_KEY) {
    throw new Error('VITE_API_ENCRYPTION_KEY environment variable is required');
  }
  if (!cipherText || typeof cipherText !== 'string') {
    throw new Error('Cipher text to decrypt must be a non-empty string');
  }
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    if (!decrypted) {
      throw new Error('Failed to decrypt token - invalid cipher text or key');
    }
    return decrypted;
  } catch (error) {
    throw new Error(`Decryption failed: ${error.message}`);
  }
};