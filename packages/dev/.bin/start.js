if (process.argv.length !== 12) {
  console.log(process.argv.length);
  console.error(
    `Usage: ${process.argv[0]} ${process.argv[1]}`
      + " <appPublic> <appIndexJs> <appSrc> <appTsConfig> <appPath> <build_dir>"
      + " <outJs> <outCss> <outMedia> <outMain>",
  );
  process.exit(1);
}

const appNodeModules = process.env.NODE_PATH;

const appTemplate = process.argv[2];
const appIndexJs = process.argv[3];
const appSrc = process.argv[4];
const appTsConfig = process.argv[5];
const appTsConfigPathsContext = process.argv[6];
const buildDir = process.argv[7];
const outJs = process.argv[8];
const outCss = process.argv[9];
const outMedia = process.argv[10];
const outMain = process.argv[11];

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "development";
const NODE_ENV = "development";
process.env.NODE_ENV = NODE_ENV;

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", err => {
  throw err;
});

const fs = require("fs");
const path = require("path");

const WebpackDevServer = require("webpack-dev-server");
var forkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const createDevServerConfig = require("./config/webpackDevServer.config");

// Tools like Cloud9 rely on this.
const port = parseInt(process.env.PORT, 10) || 3000;
const host = process.env.HOST || "0.0.0.0";
const prettyHost = host === "0.0.0.0" || host === "::" ? "localhost" : host;

if (process.env.HOST) {
  console.log(`Attempting to bind to env.HOST: ${process.env.HOST}`);
}

// webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
const publicPath = "/";

const allowedLanHost = process.env.ALLOWED_HOST;

const compiler = require("webpack")(
  require("./config/webpack.config")({
    buildDir,
    publicPath,
    enableProfiling: false,
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
);

compiler.hooks.invalid.tap("invalid", () => {
  // "invalid" is short for "bundle invalidated", it doesn't imply any errors.
  // "invalid" event fires a file change and webpack is recompiling a bundle.
  // Serving is paused; after refresh, it waits instead of serving the old one.
  console.log("\nCompiling...\n");
});

forkTsCheckerWebpackPlugin
  .getCompilerHooks(compiler)
  .waiting.tap("awaitingTypeScriptCheck", () => {
    console.log("Files successfully emitted, waiting for typecheck results...");
  });

compiler.hooks.done.tap("done", async stats => {
  if (stats.hasErrors()) {
    console.log("\nFailed to compile.\n");
    console.log(stats.toString({all: false, errors: true}));
    return;
  }
  if (stats.hasWarnings()) {
    console.log("\nCompiled with warnings.\n");
    console.log(stats.toString({all: false, warnings: true}));
    return;
  }
  console.log("Compiled successfully!");
  console.log(
    `In browser open http://${prettyHost}:${port}`
      + ` or http://${allowedLanHost}:${port}`,
  );
});

const sockPath = process.env.WDS_SOCKET_PATH || "/ws";
const proxy = process.env.PCSD_DEV_BACKEND || "http://localhost:5000";
console.log(`Backend requests will be proxyfied to ${proxy}`);
const proxyConfig = [
  {
    target: proxy,
    logLevel: "silent",
    context: (pathname, /*req*/ {method, headers}) => {
      // We use a heuristic:
      // 1. We want to proxy all the requests that are not meant for static
      // assets and as all the requests for static assets will be using GET
      // method, we can proxy all non-GET requests.
      const isStaticAsset = fs.existsSync(
        path.resolve(
          appTemplate,
          pathname.replace(new RegExp(`^${publicPath}`), ""),
        ),
      );
      // 2. For GET requests, if request accepts text/html, we pick /index.html.
      // Modern browsers include text/html into accept header when navigating.
      // However API calls like fetch() won’t generally accept text/html.
      const isNavigation = headers.accept?.indexOf("text/html") !== -1 ?? false;
      const isSocket = pathname.startsWith(sockPath);

      return method !== "GET" || !(isSocket || isStaticAsset || isNavigation);
    },
    onProxyReq: proxyReq => {
      // Browsers may send Origin headers even with same-origin
      // requests. To prevent CORS issues, we have to change
      // the Origin to match the target URL.
      if (proxyReq.getHeader("origin")) {
        proxyReq.setHeader("origin", proxy);
      }
    },
    onError: (/*err*/ {code}, /*req*/ {headers, url}, res) => {
      const msg =
        `Couldn't proxy request ${url}`
        + ` from ${headers?.host} to ${proxy} (${code})`;
      console.log(msg);
      console.log(
        "See https://nodejs.org/api/errors.html#errors_common_system_errors\n",
      );

      // And immediately send the proper error response to the client.
      // Otherwise, the request will eventually timeout with ERR_EMPTY_RESPONSE
      // on the client side.
      if (res.writeHead && !res.headersSent) {
        res.writeHead(500);
      }
      res.end(msg);
    },
    secure: false,
    changeOrigin: true,
    ws: true,
    xfwd: true,
  },
];
// Serve webpack assets generated by the compiler over a web server.
const devServer = new WebpackDevServer(
  {
    ...createDevServerConfig(
      proxyConfig,
      allowedLanHost,
      appTemplate,
      publicPath,
    ),
    host,
    port,
  },
  compiler,
);
devServer.start();

["SIGINT", "SIGTERM"].forEach(function (sig) {
  process.on(sig, function () {
    devServer.close();
    process.exit();
  });
});
