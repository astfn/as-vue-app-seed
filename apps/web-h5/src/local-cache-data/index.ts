import { LocalTokenName } from '@/common/constants';
import { genAuthController } from '@as-vue-app-seed/utils';

export const authController = genAuthController({ localTokenName: LocalTokenName });
