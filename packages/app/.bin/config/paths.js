const path = require("path");

module.exports = Object.entries(require("./paths.json")).reduce(
  (allPaths, [key, relativePath]) => {
    return {
      ...allPaths,
      [key]: path.resolve(`${__dirname}/../../${relativePath}`),
    };
  },
  {},
);
