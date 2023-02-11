module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  ignorePatterns: [ '.eslintrc.cjs' ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: [ './tsconfig.json' ],
    tsconfigRootDir: __dirname,
  },
  plugins: [ '@typescript-eslint' ],
  root: true,
  rules: {
    "@typescript-eslint/indent": [ "warn", 2 ],
    "@typescript-eslint/no-explicit-any": [ "warn", { ignoreRestArgs: true } ],
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/semi": "warn",
    "@typescript-eslint/type-annotation-spacing": "warn",
    "array-bracket-spacing": [ "warn", "always" ],
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
    "max-len": [ "warn", { ignoreComments: true, code: 81 } ],
    "no-console": [ "warn", { allow: [ "warn", "error", "info" ] } ],
    "no-multiple-empty-lines": [ "warn", { max: 1, maxEOF: 1 } ],
    "no-plusplus": "off",
    "no-trailing-spaces": [ "warn", { skipBlankLines: true, ignoreComments: true } ],
    "no-undef": "off",
    "no-underscore-dangle": "off",
    "no-unused-vars": "off",
    quotes: [ "warn", "single", { allowTemplateLiterals: true } ],
    semi: [ "warn", "always" ],
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
