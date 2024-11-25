import { LocalTokenName } from '@/common/constants';

class AuthController {
  getAuth() {
    return localStorage.getItem(LocalTokenName);
  }
  delAutn() {
    localStorage.removeItem(LocalTokenName);
  }
  setAutn(auth: string) {
    localStorage.setItem(LocalTokenName, auth);
  }
}

export const authController = new AuthController();
