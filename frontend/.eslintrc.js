module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'jsx-a11y/label-has-associated-control': ['error', { assert: 'either' }],
    'comma-dangle': ['error', 'never'],
    'max-len': ['error', { code: 150 }],
    'react/jsx-one-expression-per-line': 0
  }
};
