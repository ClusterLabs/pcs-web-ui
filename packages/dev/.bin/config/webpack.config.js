/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */

const path = require("path");
const {createHash} = require("crypto");

const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const paths = require("../../../../.bin/config/paths");
const plugins = require("../../../app/.bin/config/webpack.plugins");
const rules = require("../../../app/.bin/config/webpack.rules");
const env = require("./env");

const hash = createHash("sha256");
hash.update(JSON.stringify(env));
const envHash = hash.digest("hex");

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
) => ({
  target: ["browserslist"],
  // Webpack noise constrained to errors and warnings
  stats: "errors-warnings",
  mode: "development",
  // Stop compilation early in production
  bail: false,
  devtool: "cheap-module-source-map",
  // An entry point indicates which module webpack should use to begin
  entry: paths.appIndexJs,
  // Where to emit the bundles it creates and how to name these files.
  output: {
    // Place to write generated assets. No files are written in the case of dev
    // server if it is not explicitly set by `writeToDisk` option.
    path: buildDir,
    // Include comments in bundles with info about the contained modules.
    pathinfo: true,
    // There will be one main bundle, and one file per asynchronous chunk.
    // In development, it does not produce real files.
    filename: "static/js/[name].js",
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: "static/js/[name].chunk.js",
    assetModuleFilename: "static/media/[name].[hash][ext]",
    // To determine where the app is being served from. It requires a trailing
    // slash, or the file assets will get an incorrect path.
    publicPath,
    // Point sourcemap entries to original disk location.
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, "/"),
  },
  cache: {
    type: "filesystem",
    version: envHash,
    cacheDirectory: paths.appWebpackCache,
    store: "pack",
    buildDependencies: {
      defaultWebpack: ["webpack/lib/"],
      config: [__filename],
      tsconfig: [paths.appTsConfig],
    },
  },
  infrastructureLogging: {
    level: "none",
  },
  optimization: {
    minimize: false,
    minimizer: [
      // This is only used in production mode
      new TerserPlugin({
        terserOptions: {
          parse: {
            // We want terser to parse ecma 8 code. However, we don't want it to
            // apply any minification steps that turns valid ecma 5 code into
            // invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly
            // valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending further investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          // Added for profiling in devtools
          keep_classnames: enableProfiling,
          keep_fnames: enableProfiling,
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using
            // default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
          },
        },
        extractComments: false,
      }),
      // This is only used in production mode
      new CssMinimizerPlugin(),
    ],
  },
  resolve: {
    // This allows you to set a fallback for where webpack should look for
    // modules.
    // We placed these paths second because we want `node_modules` to "win"
    // if there are any conflicts. This matches Node resolution mechanism.
    // https://github.com/facebook/create-react-app/issues/253
    modules: ["node_modules", paths.appNodeModules, paths.appSrc],
    extensions: [".js", ".ts", ".tsx", ".json", ".jsx"],
    alias: {
      src: paths.appSrc,
      // Allows for better profiling with ReactDevTools
      ...(enableProfiling && {
        "react-dom$": "react-dom/profiling",
        "scheduler/tracing": "scheduler/tracing-profiling",
      }),
    },
  },
  module: {
    // Makes missing exports an error instead of warning.
    strictExportPresence: true,

    rules: [
      // Handle node_modules packages that contain sourcemaps
      shouldUseSourceMap && {
        enforce: "pre",
        exclude: /@babel(?:\/|\\{1,2})runtime/,
        test: /\.(js|jsx|ts|tsx|css)$/,
        loader: require.resolve("source-map-loader"),
      },
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
    ].filter(Boolean),
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
    plugins.forkTsChecker({
      async: true,
      sourceMap: true,
    }),
    plugins.eslint({failOnError: !emitErrorsAsWarnings}),
  ],
  // Turn off performance processing because we utilize
  // our own hints via the FileSizeReporter
  performance: false,
});
