module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    "@typescript-eslint/no-unsafe-assignment": "warn",
    '@typescript-eslint/no-unsafe-member-access':'warn',
    '@typescript-eslint/no-unsafe-call':'warn',
    '@typescript-eslint/no-unsafe-argument':'warn',
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: [
      './tsconfig.json',
      './tsconfig.node.json', // 针对 Node 的 tsconfig
    ],
    tsconfigRootDir: __dirname,
  },
}
