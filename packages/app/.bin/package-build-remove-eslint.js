const fs = require("fs");

const {argv} = process;

if (argv.length !== 3) {
  throw Error(
    `Usage: ${argv[0]} ${argv[1]} <package.json>`,
  );
}

const inputFileName = argv[2];

console.log(JSON.stringify(
  JSON.parse(fs.readFileSync(inputFileName, "utf8")),
  (key, value) =>
    key !== "devDependencies"
      ? value
      : Object.fromEntries(
          Object.entries(value).filter(([pkgName]) => 
            pkgName !== "confusing-browser-globals"
            && !pkgName.match(/eslint/),
          ),
      ),
  2,
));
