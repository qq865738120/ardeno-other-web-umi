const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.prettier,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  overrides: [
    {
      files: '.prettierrc',
      options: { parser: 'json' },
    },
  ],
};
