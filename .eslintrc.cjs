module.exports = {
  extends: ['mantine'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
    'linebreak-style':0,
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',
  },
};
