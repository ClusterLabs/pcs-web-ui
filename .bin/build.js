/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", err => {
  throw err;
});

// Ensure environment variables are read.
require("./config/env");

const webpack = require("webpack");

const webpackConfig = require("../packages/app/.bin/config/webpack.config");

const postcssSuffix = err =>
  Object.prototype.hasOwnProperty.call(err, "postcssNode")
    ? "\nCompileError: Begins at CSS selector " + err["postcssNode"].selector
    : "";

webpack(
  webpackConfig({
    // webpack needs to know it to put the right <script> hrefs into HTML even
    // in single-page apps that may serve index.html for nested URLs like
    // /todos/42. We can't use a relative path in HTML because we don't want
    // to load something like /todos/42/static/js/bundle.7289d.js. We have to
    // know the root.
    publicPath: "./",
    enableProfiling: process.argv.includes("--profile"),
  }),
  (err, stats) => {
    if (err) {
      console.log(err.message ? err.message + postcssSuffix(err) : err);
      throw new Error("The build failed due to the errors above.");
    }

    if (stats.hasErrors()) {
      console.log(stats.toString({all: false, errors: true}));
      throw new Error("The build failed due to the errors above.");
    }

    if (stats.hasWarnings()) {
      console.log(stats.toString({all: false, warnings: true}));
    }
    console.log("Compiled successfully.");
  },
);
