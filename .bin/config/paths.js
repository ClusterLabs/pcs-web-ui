/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */

const path = require("path");
const fs = require("fs");

module.exports = Object.entries(require("./paths.json")).reduce(
  (allPaths, [key, relativePath]) => {
    return {
      ...allPaths,
      [key]: path.resolve(fs.realpathSync(process.cwd()), relativePath),
    };
  },
  {},
);
