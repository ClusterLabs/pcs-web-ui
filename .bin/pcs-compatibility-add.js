const fs = require("node:fs");

const uiVersion = process.argv[2];
const pcsVersions = process.argv[3].split(",").map(v => v.trim());

const compatibilityMapFile = ".bin/pcs-compatibility.json";

const versionMap = JSON.parse(fs.readFileSync(compatibilityMapFile, "utf8"));

if (uiVersion in versionMap) {
  console.log(`pcs-web-ui version "${uiVersion}" already exists.`);
  process.exit(1);
}

fs.writeFileSync(
  compatibilityMapFile,
  JSON.stringify({[uiVersion]: pcsVersions, ...versionMap}, null, 2),
);
