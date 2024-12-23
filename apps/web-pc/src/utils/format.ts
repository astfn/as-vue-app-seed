// import { sm4 } from 'gm-crypt';
import CryptoJS from 'crypto-js';

const AESSecretKey = 'AESSecretKey';
export function AES_Dencrypt(word: string) {
  if (!word) return '';
  const keys = CryptoJS.enc.Utf8.parse(AESSecretKey);
  const decrypt = CryptoJS.AES.decrypt(word, keys, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}
export function AES_Encrypt(word: string) {
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const keys = CryptoJS.enc.Utf8.parse(AESSecretKey);
  const encrypted = CryptoJS.AES.encrypt(srcs, keys, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  const hexStr = encrypted.ciphertext.toString().toUpperCase();
  const oldHexStr = CryptoJS.enc.Hex.parse(hexStr);
  return CryptoJS.enc.Base64.stringify(oldHexStr);
}

// // const key = '7de1be9989cd4f7a';
// // const sm4Config = {
// //   key,
// //   mode: 'ecb',
// //   cipherType: 'base64',
// // };

// // const _SM4 = new sm4(sm4Config);

// //解密方法
// export function sm4Decrypt(word) {
//   return AES_Dencrypt(word)
//   // try {
//   //   if (!word) return '';
//   //   //console.log(sm4.decrypt(word));
//   //   const str = SM4.decrypt(word);
//   //   return str;
//   // } catch (err) {
//   //   console.error('sm4Decrypt 解密出错', err);
//   //   return '';
//   // }
// }

// //加密方法
// export function sm4Encrypt(word) {
//   return AES_Encrypt(word)
//   //console.log('en',word);
//   // try {
//   //   return SM4.encrypt(word);
//   // } catch (err) {
//   //   console.error('sm4Encrypt 加密出错', err);
//   //   return '';
//   // }
// }
