module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["react", "@typescript-eslint"],
  env: {
    browser: true,
    jest: true,
    es6: true,
    node: true,
    mocha: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "react-app",
    "airbnb",
  ],
  rules: {
    // specify whether double or single quotes should be used
    quotes: ["error", "double", { avoidEscape: true }],

    "no-unused-vars": [
      "error",
      { argsIgnorePattern: "^(dummy|_)", ignoreRestSiblings: true },
    ],

    // ensure imports point to files/modules that can be resolved
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md
    "import/no-unresolved": ["off", { commonjs: true, caseSensitive: true }],
    "import/prefer-default-export": "off",
    "lines-between-class-members": "off",
    // It creates messy diff when there is need to switch from => ( to => {
    "arrow-body-style": "off",
    "arrow-parens": ["error", "as-needed", { requireForBlockBody: true }],
    "function-paren-newline": "off",
    "object-curly-newline": "off",

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
    // "import/extensions": [2, { "js": "always", "jsx": "always" }],
    "import/extensions": ["error", "never", { packages: "always" }],
    "react/jsx-curly-newline": "off",
    "sort-imports": [
      "error",
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
      },
    ],

    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "**/test/*.js",
          "src/dev/**/*.js",
          "src/test/**/*.js",
          "src/test/**/*.ts",
        ],
      },
    ],

    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
        ],
        pathGroups: [
          {
            pattern: "app/**",
            group: "external",
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        "newlines-between": "always",
      },
    ],

    // specify the maximum length of a line in your program
    // https://eslint.org/docs/rules/max-len
    "max-len": [
      "error",
      80,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],

    // Enforce location of semicolons
    // https://eslint.org/docs/rules/semi-style
    "semi-style": "off",
    "implicit-arrow-linebreak": "off",

    "comma-style": [
      2,
      "first",
      { exceptions: { ArrayExpression: true, ObjectExpression: true } },
    ],

    // disallow use of the continue statement
    // https://eslint.org/docs/rules/no-continue
    "no-continue": "off",

    // only .jsx files may have JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
    "react/jsx-filename-extension": [
      "error",
      { extensions: [".jsx", ".js", ".tsx"] },
    ],

    // TODO start check it when flow arrive
    "react/prop-types": "off",
    "react/jsx-wrap-multilines": [
      "error",
      {
        declaration: "parens-new-line",
        assignment: "parens-new-line",
        return: "parens-new-line",
        arrow: "parens-new-line",
        condition: "parens-new-line",
        logical: "parens-new-line",
        prop: "ignore",
      },
    ],

    // disallow use of unary operators, ++ and --
    // https://eslint.org/docs/rules/no-plusplus
    "no-plusplus": "off",
    "no-restricted-syntax": [
      "error",
      "ForInStatement",
      "LabeledStatement",
      "WithStatement",
    ],

    // Requires operator at the beginning of the line in multiline statements
    // https://eslint.org/docs/rules/operator-linebreak
    "operator-linebreak": [
      "error",
      "before",
      {
        overrides: {
          "=": "ignore",
          // "&&": "ignore",
          // "||": "ignore",
        },
      },
    ],
    "jsx-a11y/label-has-for": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    loggerFn: false,
  },
  overrides: [
    {
      files: ["src/react-app-env.d.ts"],
      rules: {
        "spaced-comment": "off",
      },
    },
    {
      files: ["src/dev/**/*.{js,ts,tsx}", "src/test/**/*.{js,ts,tsx}"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
        camelcase: "off",
        "@typescript-eslint/camelcase": "off",
      },
    },
    {
      files: ["src/app/backend/**/*.{js,ts,tsx}"],
      rules: {
        // There are many backend data that uses snake case...
        camelcase: "off",
        "@typescript-eslint/camelcase": "off",
      },
    },
    {
      files: [
        // Explicit funtion return type for generators is not required.
        "src/app/store/sagas/**/*.{js,ts,tsx}",
        // TODO Exclude ts files from here (i.e. apply the rule). Don't use the
        // rule for tsx - we don't want to write React.FC<Props> for each
        // component.
        "src/**/*.{js,tsx,ts}",
      ],
      rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
      },
    },
  ],
};
