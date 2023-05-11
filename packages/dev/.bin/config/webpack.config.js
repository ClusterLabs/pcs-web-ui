const path = require("path");

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

const appConfigPath = "../../../app/.bin/config";

const plugins = require(`${appConfigPath}/webpack.plugins`);
const rules = require(`${appConfigPath}/webpack.rules`);
const config = require(`${appConfigPath}/webpack.config`);

// Source maps are resource heavy and can cause out of memory issue for large
// source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";

const emitErrorsAsWarnings = process.env.ESLINT_NO_DEV_ERRORS === "true";
const buildDir = process.env.BUILD_DIR;

if (!buildDir) {
  throw new Error("Required environment variable BUILD_DIR is not set");
}

// This is the production and development configuration.
// It is focused on developer experience, fast rebuilds, and a minimal bundle.
module.exports = (
  {publicPath, enableProfiling} = {
    publicPath: "/",
    enableProfiling: false,
  },
) => {
  const appConfig = config({publicPath, enableProfiling});
  return {
    ...appConfig,
    mode: "development",
    // Stop compilation early in production
    bail: false,
    devtool: "cheap-module-source-map",
    output: {
      ...appConfig.output,
      // Include comments in bundles with info about the contained modules.
      pathinfo: true,
      // There will be one main bundle, and one file per asynchronous chunk.
      // In development, it does not produce real files.
      filename: "static/js/[name].js",
      // There are also additional JS chunk files if you use code splitting.
      chunkFilename: "static/js/[name].chunk.js",
      // Point sourcemap entries to original disk location.
      devtoolModuleFilenameTemplate: info =>
        path.resolve(info.absoluteResourcePath).replace(/\\/g, "/"),
    },
    optimization: {minimize: false},
    resolve: {
      ...appConfig.resolve,
      alias: {src: appConfig.resolve.alias.src},
    },
    module: {
      ...appConfig.module,
      rules: [
        shouldUseSourceMap && rules.sourceMaps,
        {
          // Only the first matching is used when the it matches. When no match
          // it will fall back to the "file" loader at the end of the loaders.
          oneOf: [
            rules.images(),
            rules.scripts({
              plugins: [require.resolve("react-refresh/babel")],
              compact: false,
            }),
            rules.outsideScripts({
              sourceMaps: shouldUseSourceMap,
              inputSourceMap: shouldUseSourceMap,
            }),
            rules.css({
              styleLoader: require.resolve("style-loader"),
              sourceMap: true,
            }),
            rules.fallback,
          ],
        },
      ],
    },
    plugins: [
      plugins.environmentVariables,
      // Experimental hot reloading for React .
      // https://github.com/facebook/react/tree/main/packages/react-refresh
      new ReactRefreshWebpackPlugin({overlay: false}),
      // Watcher doesn't work well if you mistype casing in a path so we use
      // a plugin that prints an error when you attempt to do this.
      // See https://github.com/facebook/create-react-app/issues/240
      new CaseSensitivePathsPlugin(),
      plugins.forkTsChecker({async: true, sourceMap: true}),
      plugins.eslint({failOnError: !emitErrorsAsWarnings}),
    ],
    // Turn off performance processing because we utilize
    // our own hints via the FileSizeReporter
    performance: false,
  };
};
