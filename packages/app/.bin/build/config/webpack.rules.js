const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // Handle node_modules packages that contain sourcemaps
  sourceMaps: {
    enforce: "pre",
    exclude: /@babel(?:\/|\\{1,2})runtime/,
    test: /\.(js|jsx|ts|tsx|css)$/,
    loader: require.resolve("source-map-loader"),
  },

  // "url" loader works like "file" loader except that it embeds
  // assets smaller than specified limit in bytes as data URLs to
  // avoid requests. A missing `test` is equivalent to a match.
  images: options => ({
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
    type: "asset",
    ...(options ?? {}),
  }),

  // Process application JS with Babel. The preset includes JSX, Flow,
  // TypeScript, and some ESnext features.
  scripts: (
    {plugins, compact, include, cacheDirectory} = {
      plugins: [],
      compact: true,
      include: "",
      cacheDirectory: "./node_modules/.cache",
    },
  ) => ({
    test: /\.(js|jsx|ts|tsx)$/,
    include,
    loader: require.resolve("babel-loader"),
    options: {
      customize: require.resolve("babel-preset-react-app/webpack-overrides"),
      presets: [
        [
          require.resolve("babel-preset-react-app"),
          {
            runtime: "automatic",
          },
        ],
      ],

      plugins,
      // This is a feature of `babel-loader` for webpack (not Babel
      // itself). It enables caching results in
      // ./node_modules/.cache/babel-loader/ directory for faster
      // rebuilds.
      cacheDirectory: `${cacheDirectory}/babel-loader`,
      // See #6846 for context on why cacheCompression is disabled
      cacheCompression: false,
      compact,
    },
  }),

  // Process any JS outside of the app with Babel.
  // Unlike the application JS, we only compile the standard ES
  // features.
  outsideScripts: ({sourceMaps, inputSourceMap, cacheDirectory}) => ({
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
      cacheDirectory: `${cacheDirectory}/babel-loader`,
      // See #6846 for context on why cacheCompression is disabled
      cacheCompression: false,

      // Babel sourcemaps are needed for debugging into node_modules
      // code.  Without the options below, debuggers like VSCode
      // show incorrect code and set breakpoints on the wrong lines.
      sourceMaps,
      inputSourceMap,
    },
  }),

  // "postcss" loader applies autoprefixer to our CSS. "css" loader
  // resolves paths in CSS and adds assets as dependencies. "style"
  // loader turns CSS into JS modules that inject <style> tags.
  // In production, we use MiniCSSExtractPlugin to extract that CSS
  // to a file, but in development "style" loader enables hot editing
  // of CSS.
  css: ({styleLoader = undefined, defaultStyleLoaderOptions, sourceMap}) => ({
    test: /\.css$/,
    use: [
      styleLoader ?? {
        loader: MiniCssExtractPlugin.loader,
        options: defaultStyleLoaderOptions,
      },
      {
        loader: require.resolve("css-loader"),
        options: {
          importLoaders: 1,
          sourceMap,
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
          sourceMap,
        },
      },
    ],
    // Don't consider CSS imports dead code even if the
    // containing package claims to have no side effects.
    // Remove this when webpack adds a warning or an error for this.
    // See https://github.com/webpack/webpack/issues/6571
    sideEffects: true,
  }),

  // "file" loader makes sure those assets get served by
  // WebpackDevServer.
  // When you `import` an asset, you get its (virtual) filename.
  // In production, they would get copied to the `build` folder.
  // This loader doesn't use a "test" so it will catch all modules
  // that fall through the other loaders.
  fallback: {
    // Exclude `js` files to keep "css" loader working as it injects
    // its runtime that would otherwise be processed through "file"
    // loader.
    // Also exclude `html` and `json` extensions so they get processed
    // by webpacks internal loaders.
    exclude: [/^$/, /\.(js|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
    type: "asset/resource",
  },
};
