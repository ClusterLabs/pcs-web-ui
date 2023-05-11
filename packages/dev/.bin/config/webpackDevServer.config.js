const host = process.env.HOST || "0.0.0.0";
const sockHost = process.env.WDS_SOCKET_HOST;
const sockPath = process.env.WDS_SOCKET_PATH; // default: '/ws'
const sockPort = process.env.WDS_SOCKET_PORT;

module.exports = function (proxy, allowedHost, staticDir, publicPath = "/") {
  const disableFirewall =
    !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === "true";
  return {
    // WebpackDevServer 2.4.3 introduced a security fix that prevents remote
    // websites from potentially accessing local content through DNS rebinding:
    // https://github.com/webpack/webpack-dev-server/issues/887
    // https://medium.com/webpack/webpack-dev-server-middleware-security-issues-1489d950874a
    // However, it made several existing use cases such as development in cloud
    // environment or subdomains in development significantly more complicated:
    // https://github.com/facebook/create-react-app/issues/2271
    // https://github.com/facebook/create-react-app/issues/2233
    // While we're investigating better solutions, for now we will take a
    // compromise. Since our WDS configuration only serves files in the `public`
    // folder we won't consider accessing them a vulnerability. However, if you
    // use the `proxy` feature, it gets more dangerous because it can expose
    // remote code execution vulnerabilities in backends like Django and Rails.
    // So we will disable the host check normally, but enable it if you have
    // specified the `proxy` setting. Finally, we let you override it if you
    // really know what you're doing with a special environment variable.
    // Note: ["localhost", ".localhost"] will support subdomains - but we might
    // want to allow setting the allowedHosts manually for more complex setups
    allowedHosts: disableFirewall ? "all" : [allowedHost],
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
    },
    // Enable gzip compression of generated files.
    compress: true,
    static: {
      // By default WebpackDevServer serves physical files from current
      // directory in addition to all the virtual build products that it serves
      // from memory. This is confusing because those files won’t automatically
      // be available in production build folder unless we copy them. However,
      // copying the whole project directory is dangerous because we may expose
      // sensitive files. Instead, we establish a convention that only files in
      // `public` directory get served. Our build script will copy `public` into
      // the `build` folder. In `index.html`, you can get URL of `public` folder
      // with <%= publicPath %>:
      // <link rel="icon" href="<%= publicPath %>favicon.ico">
      // Note that we only recommend to use `public` folder as an escape hatch
      // for files like `favicon.ico`, `manifest.json`, and libraries that are
      // for some reason broken when imported through webpack. If you just want
      // to use an image, put it in `src` and `import` it from JavaScript
      // instead.
      directory: staticDir,
      publicPath: [publicPath],
      // By default files from `contentBase` will not trigger a page reload.
      watch: {
        // Reportedly, this avoids CPU overload on some systems.
        // https://github.com/facebook/create-react-app/issues/293
        ignored: /node_modules/,
      },
    },
    client: {
      webSocketURL: {
        // Enable custom sockjs pathname for websocket connection to hot
        // reloading server. Enable custom sockjs hostname, pathname and port
        // for websocket connection to hot reloading server.
        hostname: sockHost,
        pathname: sockPath,
        port: sockPort,
      },
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    // Use the same "publicPath" path as in the webpack config.
    devMiddleware: {publicPath},

    https: false,
    host,
    historyApiFallback: {
      // Paths with dots should still use the history fallback.
      // See https://github.com/facebook/create-react-app/issues/387.
      disableDotRule: true,
      index: publicPath,
    },
    // `proxy` is run between `before` and `after` `webpack-dev-server` hooks
    proxy,
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error("webpack-dev-server is not defined");
      }

      middlewares.push((req, res, next) => {
        // Middleware responsible for retrieving a generated source
        // Receives a webpack internal url: "webpack-internal:///<module-id>"
        // Returns a generated source:
        // "<source-text>\n<sourceMappingURL>\n<sourceURL>"
        if (!req.url.startsWith("/__get-internal-source")) {
          next();
          return;
        }
        const id = req.query.fileName.match(/webpack-internal:\/\/\/(.+)/)[1];
        if (!id || !devServer._stats) {
          next();
          return;
        }

        const {compilation} = devServer._stats;
        const source = Array.from(compilation.modules)
          .find(m => compilation.chunkGraph.getModuleId(m) === id)
          .originalSource();

        const base64Src = Buffer.from(
          JSON.stringify(source.map()),
          "utf8",
        ).toString("base64");

        res.end(
          source.source() +
            `\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,${base64Src}` +
            `\n//# sourceURL=webpack-internal:///${module.id}`,
        );
      });

      return middlewares;
    },
  };
};
