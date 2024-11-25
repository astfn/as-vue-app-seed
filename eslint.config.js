import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginVue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';

const TsCustomRules = {
  '@typescript-eslint/consistent-type-imports': 'off',
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    },
  ],
  'no-unused-vars': [
    'error',
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    },
  ],
  'no-sparse-arrays': 'off',
};

export default [
  {
    ignores: ['.history/**', '.husky/**', '.vscode/**', 'coverage/**', 'lib/**', 'node_modules/**'],
  },
  eslint.configs.recommended,
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
    },
    rules: TsCustomRules,
  },
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
