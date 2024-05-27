const fs = require("fs");

const {minify} = require("csso");

const {argv} = process;

if (argv.length !== 3) {
  throw Error(`Usage: ${argv[0]} ${argv[1]} css_file_to_minify.css`);
}

const cssFile = argv[2];

fs.writeFileSync(cssFile, minify(fs.readFileSync(cssFile, "utf8")).css);
