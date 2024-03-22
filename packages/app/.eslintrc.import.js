module.exports = {
  plugins: ["import"],
  rules: {
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules
    "import/first": "error",
    "import/extensions": [
      "error",
      "never",
      {packages: "always", json: "always", css: "always"},
    ],
    "import/newline-after-import": "error",
    "import/no-amd": "error",
    "import/no-cycle": "error",
    "import/no-extraneous-dependencies": "error",
    "import/no-webpack-loader-syntax": "error",
    "import/no-useless-path-segments": ["error", {noUselessIndex: true}],
    "import/prefer-default-export": "off",
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
          {
            pattern: "dev/**",
            group: "external",
            position: "after",
          },
          {
            pattern: "test/**",
            group: "external",
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        "newlines-between": "always",
      },
    ],
  },
};
