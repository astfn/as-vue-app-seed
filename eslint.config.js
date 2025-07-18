import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginVue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';

const TsCustomRules = {
  'no-sparse-arrays': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-unused-expressions': 'off',
  '@typescript-eslint/no-unsafe-function-type': 'off',
  '@typescript-eslint/consistent-type-imports': 'off',
  'no-console': ['error', { allow: ['warn', 'error'] }],
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    },
  ],
};

export default [
  /**
   * 全局配置
   */
  {
    ignores: ['.history/**', '.husky/**', '.vscode/**', 'coverage/**', 'lib/**', 'public/**', 'node_modules/**'],
  },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  /**
   * ts 相关配置
   * */
  {
    files: ['**/*.ts'],
    rules: TsCustomRules,
  },
  /**
   * vue 相关配置
   * */
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      parser: vueParser, // 使用vue解析器，这个可以识别vue文件
      parserOptions: {
        parser: tseslint.parser, // 在vue文件上使用ts解析器
        sourceType: 'module',
      },
    },
    rules: {
      ...TsCustomRules,
      'vue/no-v-html': 'off',
      'vue/attributes-order': 'off',
      'vue/require-emit-validator': 'warn',
      'vue/multi-word-component-names': 'off',
      'vue/no-setup-props-destructure': 'off',
      'vue/v-on-event-hyphenation': 'off',
      'vue/no-mutating-props': 'off',
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'never',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
    },
  },
  eslintConfigPrettier,
];
