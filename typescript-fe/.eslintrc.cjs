/* eslint-env node */
module.exports = {
  env: { browser: true, es2021: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    '@stylistic/ts',
  ],
  root: true,
  ignorePatterns: ['webpack.config.js'],
  rules: {
    '@stylistic/ts/semi': ['error', 'always']
  }
};
