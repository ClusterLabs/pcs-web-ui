const resolve = require("resolve");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

class ForkTsCheckerPlugin extends ForkTsCheckerWebpackPlugin {
  apply(compiler) {
    new ForkTsCheckerWebpackPlugin(this.options).apply(compiler);
    if (process.env.TSC_COMPILE_ON_ERROR === "true") {
      // Makes all issues warnings
      ForkTsCheckerWebpackPlugin.getCompilerHooks(compiler).issues.tap(
        "ForkTsCheckerPlugin",
        issues => issues.map(issue => ({...issue, severity: "warning"})),
      );
    }
  }
}

module.exports = {
  // Makes some environment variables available to the JS code, for example:
  // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
  // It is absolutely essential that NODE_ENV is set to production
  // during a production build.
  // Otherwise React will be compiled in the very slow development mode.
  environmentVariables: envForApp =>
    new webpack.DefinePlugin({
      "process.env": Object.entries(envForApp).reduce(
        (processEnv, [key, value]) => ({
          ...processEnv,
          [key]: JSON.stringify(value),
        }),
        {},
      ),
    }),

  miniCssExtract: ({outCss, outMain}) =>
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: `${outCss}/${outMain}.[contenthash:8].css`,
      chunkFilename: `${outCss}/${outMain}.[contenthash:8].chunk.css`,
    }),

  // TypeScript type checking
  forkTsChecker: ({
    async,
    sourceMap,
    nodeModules,
    configFile,
    tsBuildInfoFile,
    tsConfigPathsContext,
  }) =>
    new ForkTsCheckerPlugin({
      async,
      typescript: {
        typescriptPath: resolve.sync("typescript", {basedir: nodeModules}),
        configFile,
        configOverwrite: {
          compilerOptions: {
            sourceMap,
            skipLibCheck: true,
            inlineSourceMap: false,
            declarationMap: false,
            noEmit: true,
            incremental: true,
            tsBuildInfoFile,
          },
        },
        context: tsConfigPathsContext,
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
      // TODO - why `infrastructure: "silent"` stopped to work in dev mode?
      logger: console,
      // logger: {
      //   infrastructure: "silent",
      // },
    }),
};
