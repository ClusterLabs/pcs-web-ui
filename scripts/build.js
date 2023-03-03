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
require("../config/env");

const fs = require("fs-extra");
const bfj = require("bfj");
const webpack = require("webpack");
const formatWebpackMessages = require("react-dev-utils/formatWebpackMessages");
const printBuildError = require("react-dev-utils/printBuildError");

const paths = require("../config/paths");
const webpackConfig = require("../config/webpack.config");

const argv = process.argv.slice(2);
const writeStatsJson = argv.indexOf("--stats") !== -1;

// Create the production build and print the deployment instructions.
function build() {
  console.log("Creating an optimized production build...");

  const compiler = webpack(
    webpackConfig({
      isProduction: true,
      isCockpitContext:
        process.env.REACT_APP_PCS_WEB_UI_ENVIRONMENT === "cockpit",
      // webpack needs to know it to put the right <script> hrefs into HTML even
      // in single-page apps that may serve index.html for nested URLs like
      // /todos/42. We can't use a relative path in HTML because we don't want
      // to load something like /todos/42/static/js/bundle.7289d.js. We have to
      // know the root.
      publicPath: "./",
      enableProfiling: process.argv.includes("--profile"),
    }),
  );
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      let messages;
      if (err) {
        if (!err.message) {
          return reject(err);
        }

        let errMessage = err.message;

        // Add additional information for postcss errors
        if (Object.prototype.hasOwnProperty.call(err, "postcssNode")) {
          errMessage
            += "\nCompileError: Begins at CSS selector "
            + err["postcssNode"].selector;
        }

        messages = formatWebpackMessages({
          errors: [errMessage],
          warnings: [],
        });
      } else {
        messages = formatWebpackMessages(
          stats.toJson({all: false, warnings: true, errors: true}),
        );
      }
      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join("\n\n")));
      }

      const resolveArgs = {warnings: messages.warnings};

      if (writeStatsJson) {
        return bfj
          .write(paths.appBuild + "/bundle-stats.json", stats.toJson())
          .then(() => resolve(resolveArgs))
          .catch(error => reject(new Error(error)));
      }

      return resolve(resolveArgs);
    });
  });
}

// Remove all content but keep the directory so that
// if you're in it, you don't end up in Trash
fs.emptyDirSync(paths.appBuild);
// Merge with the public folder
fs.copySync(paths.appPublic, paths.appBuild, {
  dereference: true,
  filter: file => file !== paths.appHtml,
});
build()
  .then(
    ({warnings}) => {
      if (warnings.length) {
        console.log(`Compiled with warnings.\n\n${warnings.join("\n\n")}`);
      } else {
        console.log("Compiled successfully.\n");
      }
    },
    err => {
      const tscCompileOnError = process.env.TSC_COMPILE_ON_ERROR === "true";
      if (tscCompileOnError) {
        console.log("Compiled with the following type errors:\n");
        printBuildError(err);
      } else {
        console.log("Failed to compile.\n");
        printBuildError(err);
        process.exit(1);
      }
    },
  )
  .catch(err => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });
