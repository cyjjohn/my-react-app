import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import reactFreshPlugin from 'eslint-plugin-react-refresh'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      'react-refresh': reactFreshPlugin,
    },
  },
  {
    ignores: ['node_modules/', 'dist', '.prettierrc.mjs', '*.config.mjs', '*.config.ts'],
  },
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'], // 添加 tsconfig.json 的路径
      },
      parser: tseslint.parser,
    },
  },
  {
    settings: {
      react: {
        version: 'detect', // React 16.8 或更高可以使用detect 或者 指定具体的版本号，例如 "18.3.1"
      },
    },
  },
  {
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/react-in-jsx-scope': 'off',
    },
  },
]
