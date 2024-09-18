const fs = require("fs");

if (process.argv.length !== 3) {
  throw Error(`Usage: ${process.argv[0]} ${process.argv[1]} <version>`);
}

const version = process.argv[2];

const updateVersion = packageFile => {
  const original = JSON.parse(fs.readFileSync(packageFile, "utf8"));

  const updated = {
    ...original,
    version,
    ...(original.packages
      ? {
          packages: {
            ...original.packages,
            "": {
              ...original.packages[""],
              version,
            },
          },
        }
      : {}),
  };

  return fs.writeFileSync(packageFile, JSON.stringify(updated, null, 2));
};

updateVersion("./package.json");
updateVersion("./package-lock.json");
updateVersion("./packages/app/package.json");
updateVersion("./packages/app/package-lock.json");
