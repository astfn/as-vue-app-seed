import { AES_Dencrypt, AES_Encrypt } from '@/utils';
import { TMaskTxtProps } from '@vmono/vant-kit';

/**
 * 缓存在 localStorage 中的 token 名
 */
export const LocalTokenName = 'token';

/**
 *  MaskTxt 相关组件的默认预设配置
 */
export const MaskTxtCommonPreset: TMaskTxtProps['preset'] = {
  decrypt: AES_Dencrypt,
  encrypt: AES_Encrypt,
  fetchPlaintext: async (_maskId) => {
    // 如果项目需要脱敏，则把根据 maskId 获取未脱敏的加密数据的接口调用逻辑写在这里
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        // eslint-disable-next-line no-console
        console.log('模拟接口调用');
        resolve(AES_Dencrypt('1234567890'));
      }, 1000);
    });
  },
};
