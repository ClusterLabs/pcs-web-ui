/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */

const path = require("path");
const fs = require("fs");

module.exports = Object.entries({
  appPath: ".",
  appBuild: process.env.BUILD_PATH || "build",
  appPublic: "public",
  appHtml: "public/index.html",
  appIndexJs: "src/index.tsx",
  appPackageJson: "package.json",
  appSrc: "src",
  appTsConfig: "tsconfig.json",
  appNodeModules: "node_modules",
  appWebpackCache: "node_modules/.cache",
  appTsBuildInfoFile: "node_modules/.cache/tsconfig.tsbuildinfo",
}).reduce((allPaths, [key, relativePath]) => {
  return {
    ...allPaths,
    [key]: path.resolve(fs.realpathSync(process.cwd()), relativePath),
  };
}, {});
