module.exports = {
  extends: [
    "../app/.eslintrc.common.js",
    "../app/.eslintrc.import.js",
    "plugin:jest-playwright/recommended",
  ],
  env: {
    es6: true,
    node: true,
    jest: true,
  },
};
