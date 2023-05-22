const restrictedGlobals = require("confusing-browser-globals");

const useImportMessage =
  "Please use import() instead. More info: "
  + "https://facebook.github.io/create-react-app/docs/code-splitting";

module.exports = {
  plugins: ["react", "react-hooks", "jsx-a11y"],
  parserOptions: {ecmaFeatures: {jsx: true}},
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "./.eslintrc.common.js",
    "./.eslintrc.import.js",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "no-restricted-properties": [
      "error",
      {object: "require", property: "ensure", message: useImportMessage},
      {object: "System", property: "import", message: useImportMessage},
    ],
    "no-restricted-globals": ["error"].concat(restrictedGlobals),

    // https://github.com/yannickcr/eslint-plugin-react/tree/master/docs/rules
    "react/forbid-foreign-prop-types": ["warn", {allowInPropTypes: true}],
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
    "react/jsx-filename-extension": ["error", {extensions: [".tsx"]}],
    "react/jsx-no-comment-textnodes": "warn",
    "react/jsx-no-duplicate-props": "warn",
    "react/jsx-no-target-blank": "warn",
    "react/jsx-no-undef": "error",
    "react/no-unescaped-entities": [
      "error",
      {
        forbid: [
          {char: ">", alternatives: ["&gt;"]},
          {char: "}", alternatives: ["&#125;"]},
          {char: '"', alternatives: ["&quot;", "&ldquo;", "&#34;", "&rdquo;"]},
        ],
      },
    ],
    "react/jsx-pascal-case": ["warn", {allowAllCaps: true, ignore: []}],
    "react/no-danger-with-children": "warn",
    "react/no-direct-mutation-state": "warn",
    "react/no-is-mounted": "warn",
    "react/no-typos": "error",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/require-render-return": "error",
    "react/style-prop-object": "warn",

    // https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/rules-of-hooks": "error",

    // https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules
    "jsx-a11y/alt-text": "warn",
    "jsx-a11y/anchor-has-content": "warn",
    "jsx-a11y/anchor-is-valid": ["warn", {aspects: ["noHref", "invalidHref"]}],
    "jsx-a11y/aria-activedescendant-has-tabindex": "warn",
    "jsx-a11y/aria-props": "warn",
    "jsx-a11y/aria-proptypes": "warn",
    "jsx-a11y/aria-role": ["warn", {ignoreNonDOM: true}],
    "jsx-a11y/aria-unsupported-elements": "warn",
    "jsx-a11y/heading-has-content": "warn",
    "jsx-a11y/iframe-has-title": "warn",
    "jsx-a11y/img-redundant-alt": "warn",
    "jsx-a11y/no-access-key": "warn",
    "jsx-a11y/no-distracting-elements": "warn",
    "jsx-a11y/no-redundant-roles": "warn",
    "jsx-a11y/role-has-required-aria-props": "warn",
    "jsx-a11y/role-supports-aria-props": "warn",
    "jsx-a11y/scope": "warn",
  },

  overrides: [
    {
      files: ["src/app/backend/**/*.{js,ts,tsx}"],
      rules: {
        // There are many backend data that uses snake case...
        camelcase: "off",
        "@typescript-eslint/camelcase": "off",
      },
    },
    {
      files: [".bin/**/*.js"],
      env: {
        commonjs: true,
        es6: true,
        node: true,
      },
      parserOptions: {
        sourceType: "script",
      },
      rules: {
        camelcase: "off",
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/no-var-requires": "off",
      },
    },
    {
      files: [".eslintrc.js"],
      env: {
        commonjs: true,
      },
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
};
