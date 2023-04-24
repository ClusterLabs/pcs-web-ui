/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */

const path = require("path");
const {createHash} = require("crypto");

const webpack = require("webpack");
const resolve = require("resolve");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const paths = require("./paths");
const env = require("./env");

const hash = createHash("sha256");
hash.update(JSON.stringify(env));
const envHash = hash.digest("hex");

class ForkTsCheckerPlugin {
  apply(compiler) {
    new ForkTsCheckerWebpackPlugin().apply(compiler);
    if (process.env.TSC_COMPILE_ON_ERROR === "true") {
      // Makes all issues warnings
      ForkTsCheckerWebpackPlugin.getCompilerHooks(compiler).issues.tap(
        "ForkTsCheckerPlugin",
        issues => issues.map(issue => ({...issue, severity: "warning"})),
      );
    }
  }
}

// Source maps are resource heavy and can cause out of memory issue for large
// source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";

const emitErrorsAsWarnings = process.env.ESLINT_NO_DEV_ERRORS === "true";
const disableESLintPlugin = process.env.DISABLE_ESLINT_PLUGIN === "true";

// This is the production and development configuration.
// It is focused on developer experience, fast rebuilds, and a minimal bundle.
module.exports = (
  {isProduction, publicPath, enableProfiling} = {
    isProduction: false,
    publicPath: "/",
    enableProfiling: false,
  },
) => ({
  target: ["browserslist"],
  // Webpack noise constrained to errors and warnings
  stats: "errors-warnings",
  mode: isProduction ? "production" : "development",
  // Stop compilation early in production
  bail: isProduction,
  devtool: isProduction
    ? shouldUseSourceMap
      ? "source-map"
      : false
    : "cheap-module-source-map",
  // An entry point indicates which module webpack should use to begin
  entry: paths.appIndexJs,
  // Where to emit the bundles it creates and how to name these files.
  output: {
    path: paths.appBuild,
    // Include comments in bundles with info about the contained modules.
    pathinfo: !isProduction,
    // There will be one main bundle, and one file per asynchronous chunk.
    // In development, it does not produce real files.
    filename: isProduction
      ? "static/js/[name].[contenthash:8].js"
      : "static/js/[name].js",
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: isProduction
      ? "static/js/[name].[contenthash:8].chunk.js"
      : "static/js/[name].chunk.js",
    assetModuleFilename: "static/media/[name].[hash][ext]",
    // To determine where the app is being served from. It requires a trailing
    // slash, or the file assets will get an incorrect path.
    publicPath,
    // Point sourcemap entries to original disk location.
    devtoolModuleFilenameTemplate: info =>
      (isProduction
        ? path.relative(paths.appSrc, info.absoluteResourcePath)
        : path.resolve(info.absoluteResourcePath)
      ).replace(/\\/g, "/"),
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
    minimize: isProduction,
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
          // "url" loader works like "file" loader except that it embeds
          // assets smaller than specified limit in bytes as data URLs to
          // avoid requests. A missing `test` is equivalent to a match.
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            type: "asset",
            ...(publicPath.startsWith(".")
              ? {generator: {publicPath: "../../"}}
              : {}),
          },
          // Process application JS with Babel. The preset includes JSX, Flow,
          // TypeScript, and some ESnext features.
          {
            test: /\.(js|jsx|ts|tsx)$/,
            include: paths.appSrc,
            loader: require.resolve("babel-loader"),
            options: {
              customize: require.resolve(
                "babel-preset-react-app/webpack-overrides",
              ),
              presets: [
                [
                  require.resolve("babel-preset-react-app"),
                  {
                    runtime: "automatic",
                  },
                ],
              ],

              plugins: [
                !isProduction && require.resolve("react-refresh/babel"),
              ].filter(Boolean),
              // This is a feature of `babel-loader` for webpack (not Babel
              // itself). It enables caching results in
              // ./node_modules/.cache/babel-loader/ directory for faster
              // rebuilds.
              cacheDirectory: true,
              // See #6846 for context on why cacheCompression is disabled
              cacheCompression: false,
              compact: isProduction,
            },
          },
          // Process any JS outside of the app with Babel.
          // Unlike the application JS, we only compile the standard ES
          // features.
          {
            test: /\.(js)$/,
            exclude: /@babel(?:\/|\\{1,2})runtime/,
            loader: require.resolve("babel-loader"),
            options: {
              babelrc: false,
              configFile: false,
              compact: false,
              presets: [
                [
                  require.resolve("babel-preset-react-app/dependencies"),
                  {helpers: true},
                ],
              ],
              cacheDirectory: true,
              // See #6846 for context on why cacheCompression is disabled
              cacheCompression: false,

              // Babel sourcemaps are needed for debugging into node_modules
              // code.  Without the options below, debuggers like VSCode
              // show incorrect code and set breakpoints on the wrong lines.
              sourceMaps: shouldUseSourceMap,
              inputSourceMap: shouldUseSourceMap,
            },
          },
          // "postcss" loader applies autoprefixer to our CSS. "css" loader
          // resolves paths in CSS and adds assets as dependencies. "style"
          // loader turns CSS into JS modules that inject <style> tags.
          // In production, we use MiniCSSExtractPlugin to extract that CSS
          // to a file, but in development "style" loader enables hot editing
          // of CSS.
          {
            test: /\.css$/,
            use: [
              !isProduction && require.resolve("style-loader"),
              isProduction && {
                loader: MiniCssExtractPlugin.loader,
                // css is located in `static/css`, use '../../' to locate
                // index.html folder in production `publicPath` can be a
                // relative path
                options: publicPath.startsWith(".")
                  ? {publicPath: "../../"}
                  : {},
              },
              {
                loader: require.resolve("css-loader"),
                options: {
                  importLoaders: 1,
                  sourceMap: !isProduction || shouldUseSourceMap,
                  modules: {
                    mode: "icss",
                  },
                },
              },
              {
                // Options for PostCSS as we reference these options twice
                // adds vendor prefixing based on your specified browser
                // support in package.json
                loader: require.resolve("postcss-loader"),
                options: {
                  postcssOptions: {
                    // Necessary for external CSS imports to work
                    // https://github.com/facebook/create-react-app/issues/2677
                    ident: "postcss",
                    config: false,
                    plugins: [
                      "postcss-flexbugs-fixes",
                      [
                        "postcss-preset-env",
                        {
                          autoprefixer: {
                            flexbox: "no-2009",
                          },
                          stage: 3,
                        },
                      ],
                      // Adds PostCSS Normalize as the reset css with default
                      // options, so that it honors browserslist config in
                      // package.json which in turn let's users customize the
                      // target behavior as per their needs.
                      "postcss-normalize",
                    ],
                  },
                  sourceMap: !isProduction || shouldUseSourceMap,
                },
              },
            ].filter(Boolean),
            // Don't consider CSS imports dead code even if the
            // containing package claims to have no side effects.
            // Remove this when webpack adds a warning or an error for this.
            // See https://github.com/webpack/webpack/issues/6571
            sideEffects: true,
          },
          // "file" loader makes sure those assets get served by
          // WebpackDevServer.
          // When you `import` an asset, you get its (virtual) filename.
          // In production, they would get copied to the `build` folder.
          // This loader doesn't use a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise be processed through "file"
            // loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/^$/, /\.(js|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            type: "asset/resource",
          },
          // ** STOP ** Are you adding a new loader?
          // Make sure to add the new loader(s) before the "file" loader.
        ],
      },
    ].filter(Boolean),
  },
  plugins: [
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
    // It is absolutely essential that NODE_ENV is set to production
    // during a production build.
    // Otherwise React will be compiled in the very slow development mode.
    new webpack.DefinePlugin({
      "process.env": Object.entries(env).reduce(
        (processEnv, [key, value]) => ({
          ...processEnv,
          [key]: JSON.stringify(value),
        }),
        {},
      ),
    }),
    // Experimental hot reloading for React .
    // https://github.com/facebook/react/tree/main/packages/react-refresh
    !isProduction && new ReactRefreshWebpackPlugin({overlay: false}),
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebook/create-react-app/issues/240
    !isProduction && new CaseSensitivePathsPlugin(),
    isProduction &&
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "static/css/[name].[contenthash:8].css",
        chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
      }),
    // TypeScript type checking
    new ForkTsCheckerPlugin({
      async: !isProduction,
      typescript: {
        typescriptPath: resolve.sync("typescript", {
          basedir: paths.appNodeModules,
        }),
        configOverwrite: {
          compilerOptions: {
            sourceMap: !isProduction || shouldUseSourceMap,
            skipLibCheck: true,
            inlineSourceMap: false,
            declarationMap: false,
            noEmit: true,
            incremental: true,
            tsBuildInfoFile: paths.appTsBuildInfoFile,
          },
        },
        context: paths.appPath,
        diagnosticOptions: {
          syntactic: true,
        },
        mode: "write-references",
        // profile: true,
      },
      issue: {
        // This one is specifically to match during CI tests,
        // as micromatch doesn't match
        // '../cra-template-typescript/template/src/App.tsx'
        // otherwise.
        include: [
          {file: "../**/src/**/*.{ts,tsx}"},
          {file: "**/src/**/*.{ts,tsx}"},
        ],
        exclude: [{file: "**/src/**/?(*.){spec|test}.*"}],
      },
      logger: {
        infrastructure: "silent",
      },
    }),
    !disableESLintPlugin &&
      new ESLintPlugin({
        // Plugin options
        extensions: ["js", "jsx", "ts", "tsx"],
        eslintPath: require.resolve("eslint"),
        failOnError: isProduction || !emitErrorsAsWarnings,
        context: paths.appSrc,
        cache: true,
        cacheLocation: path.resolve(
          paths.appNodeModules,
          ".cache/.eslintcache",
        ),
        // ESLint class options
        cwd: paths.appPath,
        resolvePluginsRelativeTo: __dirname,
        baseConfig: {
          extends: [require.resolve("eslint-config-react-app/base")],
        },
      }),
  ].filter(Boolean),
  // Turn off performance processing because we utilize
  // our own hints via the FileSizeReporter
  performance: false,
});
