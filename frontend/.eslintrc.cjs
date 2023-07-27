module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  ignorePatterns: [
    '.eslintrc.cjs',
    'webpack.config.js'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: [ './tsconfig.json' ],
    tsconfigRootDir: __dirname,
  },
  plugins: [ '@typescript-eslint', 'react-hooks' ],
  root: true,
  rules: {
    "@typescript-eslint/comma-dangle": [ "warn", "always-multiline" ],
    "@typescript-eslint/indent": [ "warn", 2 ],
    "@typescript-eslint/no-explicit-any": [ "warn", { ignoreRestArgs: true } ],
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/semi": "warn",
    "@typescript-eslint/type-annotation-spacing": "warn",
    "array-bracket-spacing": [ "warn", "never" ],
    "brace-style": [ "warn", "1tbs", { allowSingleLine: true } ],
    "comma-dangle": [ "warn", "always-multiline" ],
    "comma-spacing": [ "warn", { before: false, after: true } ],
    curly: [ "warn", "all" ],
    "function-paren-newline": [ "warn", "consistent" ],
    "import/extensions": [ "off", "never" ],
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "key-spacing": "warn",
    "keyword-spacing": [ "warn", { before: true, after: true } ],
    "linebreak-style": [ "warn", "unix" ],
    "lines-between-class-members": "off",
    "max-len": [ "warn", { ignoreComments: true, code: 110 } ],
    "no-console": [ "warn", { allow: [ "warn", "error", "info" ] } ],
    "no-multiple-empty-lines": [ "warn", { max: 1, maxEOF: 1 } ],
    "no-plusplus": "off",
    "no-trailing-spaces": [ "warn", { skipBlankLines: false, ignoreComments: false } ],
    "no-undef": "off",
    "no-underscore-dangle": "off",
    "no-unused-vars": "off",
    "object-curly-spacing": [ "warn", "always" ],
    quotes: [ "warn", "single", { allowTemplateLiterals: true } ],
    "react-hooks/exhaustive-deps": "warn",
    semi: [ "warn", "always" ],
    "space-before-function-paren": "warn",
    "space-infix-ops": "warn",
    "space-unary-ops": [
      2, {
        words: true,
        nonwords: false,
        overrides: {}
      }
    ],
    "template-curly-spacing": [ "warn", "never" ]
  },
};
