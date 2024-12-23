export type TAuthControllerPresets = {
  localTokenName: string;
};
class AuthController {
  private presets: TAuthControllerPresets;

  constructor(payload?: Partial<TAuthControllerPresets>) {
    this.presets = {
      localTokenName: 'token',
      ...(payload ?? {}),
    };
  }
  getAuth() {
    return localStorage.getItem(this.presets.localTokenName);
  }
  delAutn() {
    localStorage.removeItem(this.presets.localTokenName);
  }
  setAutn(auth: string) {
    localStorage.setItem(this.presets.localTokenName, auth);
  }
}

export const genAuthController = (payload?: Partial<TAuthControllerPresets>) => new AuthController(payload);
