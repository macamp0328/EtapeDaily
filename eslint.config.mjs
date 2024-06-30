import { defineConfig } from 'eslint/config';
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default defineConfig({
  files: ['**/*.{js,mjs,cjs,ts,tsx}'],
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    globals: globals.browser,
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    pluginJs.configs.recommended,
    tseslint.configs.recommended,
    'plugin:prettier/recommended', // Uses Prettier and disables ESLint rules that might conflict.
    prettier // Disables ESLint rules that might conflict with prettier
  ],
  rules: {
    'prettier/prettier': 'error', // Ensures prettier issues are treated as errors
    '@typescript-eslint/explicit-module-boundary-types': 'off' // Example of a TypeScript rule you might want to turn off
  },
});
