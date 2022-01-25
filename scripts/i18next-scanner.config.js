const typescriptTransform = require('i18next-scanner-typescript')

module.exports = {
  input: [
    'src/**/*.{ts,tsx,js,jsx}',
    // Use ! to filter out files or directories
    '!app/**/*.test.{ts,tsx}',
    '!**/node_modules/**',
  ],
  output: './',
  options: {
    debug: true,
    sort: true,
    removeUnusedKeys: false,
    func: {
      list: ['i18next.t', 'i18n.t', 't'],
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    trans: {
      component: 'Trans',
      i18nKey: 'i18nKey',
      defaultsKey: 'defaults',
      fallbackKey: function(ns, value) {
        return value
      },
      acorn: {
        ecmaVersion: 2021, // defaults to 10
        sourceType: 'module', // defaults to 'module'
        // Check out https://github.com/acornjs/acorn/tree/master/acorn#interface for additional options
      },
    },
    lngs: ['fr'],
    ns: ['translation'],
    defaultLng: 'fr',
    defaultNs: 'translation',
    defaultValue: '__STRING_NOT_TRANSLATED__',
    resource: {
      loadPath: 'translations/{{lng}}/{{ns}}.json',
      savePath: 'translations/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    nsSeparator: '::', // namespace separator
    keySeparator: '.', // key separator
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
  },
  transform: typescriptTransform({
    extensions: ['.tsx', '.ts'],
    tsOptions: {
      target: 'es2017',
    },
  }),
}
