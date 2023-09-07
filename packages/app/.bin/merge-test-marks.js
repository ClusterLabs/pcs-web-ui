const fs = require("fs");
const path = require("path");

const jsonExtension = ".json";

const readDirItem = (dirName, item) => {
  const fullPath = path.join(dirName, item);
  const stat = fs.statSync(fullPath);

  if (stat.isDirectory()) {
    return {[item]: readDir(fullPath)};
  }

  if (stat.isFile() && item.endsWith(jsonExtension)) {
    const key = item.slice(0, -1 * jsonExtension.length);
    return {[key]: JSON.parse(fs.readFileSync(fullPath))};
  }

  return {};
};

const readDir = dirName =>
  fs
    .readdirSync(dirName)
    .reduce((marks, item) => ({...marks, ...readDirItem(dirName, item)}), {});

console.log(JSON.stringify(readDir(process.argv[2])));
