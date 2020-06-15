module.exports = {
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': [
    'airbnb-base',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'rules': {
    'linebreak-style': 0,
    'comma-dangle': ["error", "never"],
    'import/no-unresolved': [ 2,  { "caseSensitive": false }],
    'camelcase': ["error", { properties: "never" }],
    'no-else-return': ["error"],
    'max-len': ["error", { "code": 300 }],
    'arrow-body-style': ["error", "as-needed", { "requireReturnForObjectLiteral": true }],
    'object-curly-newline': ["error", { "multiline": true }],
    'no-underscore-dangle': ["error", { "allow": ["_config", "_type", "_site", "_channelId", "_format"] }]
  }
};