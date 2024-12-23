import globals from 'globals';
import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import { genTsLintConfig } from './tsLintConfig.js';
import { genVueLintConfigArr } from './vueLintConfig.js';

export * from './tsLintConfig.js';
export * from './vueLintConfig.js';

export default [
  {
    ignores: ['.history/**', '.husky/**', '.vscode/**', 'coverage/**', 'lib/**', 'node_modules/**'],
  },
  eslint.configs.recommended,
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  genTsLintConfig(),
  ...genVueLintConfigArr(),
  eslintConfigPrettier,
];
