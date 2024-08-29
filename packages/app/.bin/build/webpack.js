/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */

if (process.argv.length !== 4) {
  console.error(
    `Usage: ${process.argv[0]} ${process.argv[1]} <src_dir> <build_dir>`,
  );
  process.exit(1);
}

const appNodeModules = process.env.NODE_PATH;
const srcDir = process.argv[2];
const buildDir = process.argv[3];

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "production";
// It is absolutely essential that NODE_ENV is set to production during a
// production build. Otherwise React will be compiled in the very slow
// development mode.
const NODE_ENV = "production";
process.env.NODE_ENV = NODE_ENV;

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", err => {
  throw err;
});

const path = require("path");

const webpack = require("webpack");

let paths = Object.entries(require("./paths.json")).reduce(
  (allPaths, [key, relativePath]) => {
    return {
      ...allPaths,
      [key]: path.resolve(`${srcDir}/${relativePath}`),
    };
  },
  {},
);

const webpackConfig = require("./webpack.config");

const postcssSuffix = err =>
  Object.prototype.hasOwnProperty.call(err, "postcssNode")
    ? "\nCompileError: Begins at CSS selector " + err["postcssNode"].selector
    : "";

webpack(
  webpackConfig({
    buildDir,
    // webpack needs to know it to put the right <script> hrefs into HTML even
    // in single-page apps that may serve index.html for nested URLs like
    // /todos/42. We can't use a relative path in HTML because we don't want
    // to load something like /todos/42/static/js/bundle.7289d.js. We have to
    // know the root.
    publicPath: "./",
    enableProfiling: process.argv.includes("--profile"),
    appIndexJs: paths.appIndexJs,
    srcDir: paths.appSrc,
    cacheDirectory: `${appNodeModules}/.cache`,
    tsConfig: paths.appTsConfig,
    nodeModules: appNodeModules,
    tsBuildInfoFile: `${appNodeModules}/.cache/tsconfig.tsbuildinfo`,
    tsConfigPathsContext: paths.appPath,
    envForApp: {NODE_ENV},
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
