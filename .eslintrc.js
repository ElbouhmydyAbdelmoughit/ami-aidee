module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'no-unused-vars': 2,
    // '@typescript-eslint/no-unused-vars': [
    //   'error',
    //   {
    //     ignoreRestSiblings: true,
    //     varsIgnorePattern: '_',
    //     argsIgnorePattern: '^_',
    //   },
    // ],
    /* There is no objective advantage of separate style vs. inline style,
     * other than making the component easier to read.
     * react-native StyleSheet usage also makes no difference
     * https://stackoverflow.com/questions/38958888/react-native-what-is-the-benefit-of-using-stylesheet-vs-a-plain-object
     * https://stackoverflow.com/a/52994858/3061845
     */
    'react-native/no-inline-styles': ['off'],
    'react/jsx-key': ['error'],
    'react/react-in-jsx-scope': ['error'],
    // false positive on function dep
    'react-hooks/exhaustive-deps': ['off'],
    'no-console': ['off'],
    // TODO: activate this rule & convert inline jsx arrow functions
    // important for good rendering performance
    'react/jsx-no-bind': [
      'off',
      {
        ignoreDOMComponents: false,
        ignoreRefs: true,
        allowArrowFunctions: false,
        allowFunctions: false,
        allowBind: false,
      },
    ],
    semi: ['error', 'never'],
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/no-empty-function': [
      'error',
      {
        allow: ['arrowFunctions', 'functions', 'asyncFunctions'],
      },
    ],
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-object-literal-type-assertion': 0,
    '@typescript-eslint/no-var-requires': 0,
    // '@typescript-eslint/no-unused-vars': [
    //   'error',
    //   {
    //     argsIgnorePattern: '^_',
    //     varsIgnorePattern: '^_',
    //   },
    // ],
  },
}
