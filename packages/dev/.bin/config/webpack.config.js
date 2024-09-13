const path = require("path");

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

const appWebpackPath = "../../../app/.bin/build";

const plugins = require(`${appWebpackPath}/webpack.plugins`);
const rules = require(`${appWebpackPath}/webpack.rules`);
const config = require(`${appWebpackPath}/webpack.config`);
const {app: src} = require(`${appWebpackPath}/structure.json`);

// Source maps are resource heavy and can cause out of memory issue for large
// source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";

const emitErrorsAsWarnings = process.env.ESLINT_NO_DEV_ERRORS === "true";

module.exports = ({
  srcDir,
  outputDir,
  publicPath,
  outJs,
  outCss,
  outMedia,
  outMain,
}) => {
  const nodeModules = process.env.NODE_PATH;
  const cacheDirectory = path.join(nodeModules, ".cache");
  const tsConfig = path.join(srcDir, src.tsConfig);
  const tsConfigPathsContext = path.join(srcDir, src.tsConfigPathsContext);
  const envForApp = {NODE_ENV: process.env.NODE_ENV};
  const appSrc = path.join(
    srcDir,
    require(path.join(srcDir, src.tsConfig)).compilerOptions.baseUrl,
  );
  const appConfig = config({
    outputDir,
    publicPath,
    srcDir,
    outJs,
    outCss,
    outMedia,
    outMain,
  });
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
      filename: `${outJs}/${outMain}.js`,
      // There are also additional JS chunk files if you use code splitting.
      chunkFilename: `${outJs}/${outMain}.chunk.js`,
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
              include: appSrc,
              cacheDirectory,
            }),
            rules.outsideScripts({
              sourceMaps: shouldUseSourceMap,
              inputSourceMap: shouldUseSourceMap,
              cacheDirectory,
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
      plugins.environmentVariables(envForApp),
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
        nodeModules,
        configFile: tsConfig,
        tsBuildInfoFile: path.join(cacheDirectory, "tsconfig.tsbuildinfo"),
        tsConfigPathsContext,
      }),
      new ESLintPlugin({
        extensions: ["js", "jsx", "ts", "tsx"],
        eslintPath: require.resolve("eslint"),
        failOnError: !emitErrorsAsWarnings,
        context: srcDir,
        cache: true,
        cacheLocation: path.resolve(nodeModules, ".cache/.eslintcache"),
        // ESLint class options
        cwd: tsConfigPathsContext,
        resolvePluginsRelativeTo: __dirname,
        // baseConfig: {
        //   extends: [require.resolve("eslint-config-react-app/base")],
        // },
      }),
    ],
    // Turn off performance processing because we utilize
    // our own hints via the FileSizeReporter
    performance: false,
  };
};
