module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    jest: true,
    es6: true,
    node: true,
    mocha: true,
  },
  extends: [
    "react-app",
    'airbnb',
  ],
  rules: {
    // specify whether double or single quotes should be used
    quotes: ['error', 'double', { avoidEscape: true }],

    // ensure imports point to files/modules that can be resolved
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md
    'import/no-unresolved': ['off', { commonjs: true, caseSensitive: true }],

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
    // "import/extensions": [2, { "js": "always", "jsx": "always" }],
    "import/extensions": ["error", "never", { "packages": "always" }],

    "import/no-extraneous-dependencies": ["error", {
      "devDependencies": [
        "**/test/*.js",
        "src/dev/**/*.js",
        "src/test/**/*.js",
      ]
    }],

    // specify the maximum length of a line in your program
    // https://eslint.org/docs/rules/max-len
    'max-len': ['error', 80, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],

    // Enforce location of semicolons
    // https://eslint.org/docs/rules/semi-style
    'semi-style': 'off',

    "comma-style": [2, "first", {exceptions: {ArrayExpression: true, ObjectExpression: true} }],

    // disallow use of the continue statement
    // https://eslint.org/docs/rules/no-continue
    'no-continue': 'off',

    // only .jsx files may have JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', ".js"] }],

    // TODO start check it when flow arrive
    'react/prop-types': 'off',

    // disallow use of unary operators, ++ and --
    // https://eslint.org/docs/rules/no-plusplus
    'no-plusplus': 'off',

    // Requires operator at the beginning of the line in multiline statements
    // https://eslint.org/docs/rules/operator-linebreak
    'operator-linebreak': ['error', 'before', { overrides: {
      '=': 'none',
      "&&": "ignore",
      "||": "ignore",
    } }],
  },
  parserOptions: {
    ecmaFeatures: {
      'jsx': true,
    }
  }
};
