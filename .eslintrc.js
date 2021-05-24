module.exports = {
  env: {
    browser: true,
    node: true,
    'jest/globals': true,
  },

  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
  ],
  plugins: ['@typescript-eslint', 'jest', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'max-len': [
      'error',
      { ignoreComments: true },
      { ignoreTrailingComments: true },
      { code: 120 },
    ],
  },
};
