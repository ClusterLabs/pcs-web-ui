if (process.argv.length !== 11) {
  console.log(process.argv.length);
  console.error(
    `Usage: ${process.argv[0]} ${process.argv[1]}`
      + " <appIndexJs> <appSrc> <appTsConfig> <appPath> <build_dir>"
      + " <outJs> <outCss> <outMedia> <outMain>",
  );
  process.exit(1);
}

const appNodeModules = process.env.NODE_PATH;

const appIndexJs = process.argv[2];
const appSrc = process.argv[3];
const appTsConfig = process.argv[4];
const appTsConfigPathsContext = process.argv[5];
const buildDir = process.argv[6];
const outJs = process.argv[7];
const outCss = process.argv[8];
const outMedia = process.argv[9];
const outMain = process.argv[10];

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

const postcssSuffix = err =>
  Object.prototype.hasOwnProperty.call(err, "postcssNode")
    ? "\nCompileError: Begins at CSS selector " + err["postcssNode"].selector
    : "";

require("webpack")(
  require("./webpack.config")({
    buildDir,
    // webpack needs to know it to put the right <script> hrefs into HTML even
    // in single-page apps that may serve index.html for nested URLs like
    // /todos/42. We can't use a relative path in HTML because we don't want
    // to load something like /todos/42/static/js/bundle.7289d.js. We have to
    // know the root.
    publicPath: "./",
    enableProfiling: process.argv.includes("--profile"),
    appIndexJs,
    srcDir: appSrc,
    cacheDirectory: `${appNodeModules}/.cache`,
    tsConfig: appTsConfig,
    nodeModules: appNodeModules,
    tsBuildInfoFile: `${appNodeModules}/.cache/tsconfig.tsbuildinfo`,
    tsConfigPathsContext: appTsConfigPathsContext,
    envForApp: {NODE_ENV},
    outJs,
    outCss,
    outMedia,
    outMain,
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
