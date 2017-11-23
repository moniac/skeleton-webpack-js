module.exports = {
  parser: 'postcss-scss',
  plugins: {
    'precss': {},
    'postcss-import': {},
    'postcss-flexbugs-fixes': {},
    'postcss-hexrgba': {},
    'postcss-focus': {},
    'postcss-cssnext': {},
    'postcss-browser-reporter': {},
    'postcss-reporter': {
      filter: message => message.type !== 'dependency'
    }
  }
};
