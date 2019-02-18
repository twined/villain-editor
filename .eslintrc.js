module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // vuejs screws up this anyways
    'no-use-before-define': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "vue/html-end-tags": 0,
    "vue/html-self-closing": 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}