const path = require("path");
const {createHash} = require("crypto");

const TerserPlugin = require("terser-webpack-plugin");

const plugins = require("./webpack.plugins");
const rules = require("./webpack.rules");

const envHash = env => {
  const hash = createHash("sha256");
  hash.update(JSON.stringify(env));
  return hash.digest("hex");
};

// Source maps are resource heavy and can cause out of memory issue for large
// source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";

// This is the production and development configuration.
// It is focused on developer experience, fast rebuilds, and a minimal bundle.
module.exports = ({
  buildDir,
  publicPath,
  enableProfiling,
  appIndexJs,
  srcDir,
  cacheDirectory,
  tsConfig,
  nodeModules,
  tsBuildInfoFile,
  tsConfigPathsContext,
  envForApp,
}) => ({
  target: ["browserslist"],
  // Webpack noise constrained to errors and warnings
  stats: "errors-warnings",
  mode: "production",
  // Stop compilation early in production
  bail: true,
  devtool: shouldUseSourceMap ? "source-map" : false,
  // An entry point indicates which module webpack should use to begin
  entry: appIndexJs,
  // Where to emit the bundles it creates and how to name these files.
  output: {
    // Place to write generated assets. No files are written in the case of dev
    // server if it is not explicitly set by `writeToDisk` option.
    path: buildDir,
    // Include comments in bundles with info about the contained modules.
    pathinfo: false,
    // There will be one main bundle, and one file per asynchronous chunk.
    // In development, it does not produce real files.
    filename: "static/js/[name].[contenthash:8].js",
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: "static/js/[name].[contenthash:8].chunk.js",
    assetModuleFilename: "static/media/[name].[hash][ext]",
    // To determine where the app is being served from. It requires a trailing
    // slash, or the file assets will get an incorrect path.
    publicPath,
    // Point sourcemap entries to original disk location.
    devtoolModuleFilenameTemplate: info =>
      path.relative(srcDir, info.absoluteResourcePath).replace(/\\/g, "/"),
  },
  cache: {
    type: "filesystem",
    version: envHash(envForApp),
    cacheDirectory,
    store: "pack",
    buildDependencies: {
      defaultWebpack: ["webpack/lib/"],
      config: [__filename],
      tsconfig: [tsConfig],
    },
  },
  infrastructureLogging: {
    level: "none",
  },
  optimization: {
    minimize: true,
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
    ],
  },
  resolve: {
    // This allows you to set a fallback for where webpack should look for
    // modules.
    // We placed these paths second because we want `node_modules` to "win"
    // if there are any conflicts. This matches Node resolution mechanism.
    // https://github.com/facebook/create-react-app/issues/253
    modules: ["node_modules", nodeModules, srcDir],
    extensions: [".js", ".ts", ".tsx", ".json", ".jsx"],
    alias: {
      src: srcDir,
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
      shouldUseSourceMap && rules.sourceMaps,
      {
        // Only the first matching is used when the it matches. When no match
        // it will fall back to the "file" loader at the end of the loaders.
        oneOf: [
          rules.images(
            publicPath.startsWith(".")
              ? {generator: {publicPath: "../../"}}
              : {},
          ),
          rules.scripts({
            plugins: [],
            compact: true,
            include: srcDir,
            cacheDirectory,
          }),
          rules.outsideScripts({
            sourceMaps: shouldUseSourceMap,
            inputSourceMap: shouldUseSourceMap,
            cacheDirectory,
          }),
          rules.css({
            // css is located in `static/css`, use '../../' to locate
            // index.html folder in production `publicPath` can be a
            // relative path
            defaultStyleLoaderOptions: publicPath.startsWith(".")
              ? {publicPath: "../../"}
              : {},
            sourceMap: shouldUseSourceMap,
          }),
          rules.fallback,
        ],
      },
    ],
  },
  plugins: [
    plugins.environmentVariables(envForApp),
    plugins.miniCssExtract,
    plugins.forkTsChecker({
      async: false,
      sourceMap: shouldUseSourceMap,
      nodeModules,
      configFile: tsConfig,
      tsBuildInfoFile,
      tsConfigPathsContext,
    }),
  ],
  // Turn off performance processing because we utilize
  // our own hints via the FileSizeReporter
  performance: false,
});
