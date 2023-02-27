/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */

const {createHash} = require("crypto");

module.exports = env => {
  const hash = createHash("sha256");
  hash.update(JSON.stringify(env));

  return hash.digest("hex");
};
