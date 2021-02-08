module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: ['airbnb-base', 'eslint:recommended', 'prettier'],
  plugins: ['jest', 'prettier'],

  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'max-len': [
      'error',
      { ignoreComments: true },
      { ignoreTrailingComments: true },
      { code: 120 },
    ],
    'prettier/prettier': 'error',
  },
};
