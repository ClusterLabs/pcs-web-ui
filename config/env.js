/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require("fs");
const path = require("path");

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
  throw new Error(
    "The NODE_ENV environment variable is required but was not specified.",
  );
}

// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebook/create-react-app/issues/253.
// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders
// Note that unlike in Node, only *relative* paths from `NODE_PATH` are honored.
// Otherwise, we risk importing Node.js core modules into an app instead of
// webpack shims.
// https://github.com/facebook/create-react-app/issues/1023#issuecomment-265344421
// We also resolve them to make sure all tools using them work consistently.
const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || "")
  .split(path.delimiter)
  .filter(folder => folder && !path.isAbsolute(folder))
  .map(folder => path.resolve(appDirectory, folder))
  .join(path.delimiter);

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in webpack configuration.

module.exports = Object.keys(process.env)
  .filter(key => key.startsWith("REACT_APP_"))
  .reduce((env, key) => ({...env, [key]: process.env[key]}), {
    // Useful for determining whether we’re running in production mode.
    // Most importantly, it switches React into the correct mode.
    NODE_ENV: process.env.NODE_ENV || "development",
    // We support configuring the sockjs pathname during development.
    // These settings let a developer run multiple simultaneous projects.
    // They are used as the connection `hostname`, `pathname` and `port` in
    // webpackHotDevClient. They are used as the `sockHost`, `sockPath` and
    // `sockPort` options in webpack-dev-server.
    WDS_SOCKET_HOST: process.env.WDS_SOCKET_HOST,
    WDS_SOCKET_PATH: process.env.WDS_SOCKET_PATH,
    WDS_SOCKET_PORT: process.env.WDS_SOCKET_PORT,
  });
