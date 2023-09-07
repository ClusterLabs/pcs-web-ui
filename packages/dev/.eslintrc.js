module.exports = {
  extends: ["../app/.eslintrc.common.js"],
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
};
