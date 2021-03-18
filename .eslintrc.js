module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],

  // in antd-design-pro
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },

  rules: {
    'no-unused-vars': ['error'],
    'no-var': ['warn'],
    'no-console': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-empty-function': ['warn'],
    'jsx-quotes': ['error', 'prefer-double'],
    '@typescript-eslint/no-explicit-any': 0,
    'react/self-closing-comp': 1,
    '@typescript-eslint/consistent-type-imports': 0,
  },
};
