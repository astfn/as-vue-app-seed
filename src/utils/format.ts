// import { getSm4CryptoTool } from '@vmono/utils';
import { getAesCryptoTool } from '@vmono/utils';

const AESSecretKey = /* @mangle */ 'AESSecretKey'; /* @/mangle */
export const { AES_Encrypt, AES_Dencrypt } = getAesCryptoTool({ key: AESSecretKey });
