import CryptoJS from 'crypto-js';
import { SECRET_KEY } from './const';


export const encryption = {
  // Encrypt data
  encrypt: (data: string): string => {
    try {
      const ciphertext = CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
      return ciphertext;
    } catch (error) {
      console.error('Encryption error:', error);
      return '';
    }
  },

  // Decrypt data  
  decrypt: (encryptedData: string): string => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
      const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedText;
    } catch (error) {
      console.error('Decryption error:', error);
      return '';
    }
  }
};
