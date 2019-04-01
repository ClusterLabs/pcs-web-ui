/* eslint-disable import/no-extraneous-dependencies */
const express = require("express");
const fs = require("fs");

const scenario = process.argv[2] || "default";
const delay = Number.parseInt(process.argv[3], 10) || 1000;

const scenarioByName = (scenarioName) => {
  const [sceneName, particularScenario] = scenarioName.split(".");
  const scenarioFile = `./${sceneName}.js`;
  /* eslint-disable global-require, import/no-dynamic-require */
  const scenarioMap = require(scenarioFile);
  return scenarioMap[particularScenario];
};

/* eslint-disable no-console, global-require */
if (scenario === "default") {
  console.log("Please provide scenario");
  console.log("--------------------------------------------------------------");
  fs.readdirSync(__dirname).forEach((fileName) => {
    if (fileName !== __filename.slice(__dirname.length + 1)) {
      Object.keys(require(`./${fileName}`)).forEach((scenarioName) => {
        console.log(`${fileName.replace(/\.[^/.]+$/, "")}.${scenarioName}`);
      });
    }
  });
  console.log("--------------------------------------------------------------");
  process.exit(0);
}
const app = express();
scenarioByName(scenario).forEach((call) => {
  app[call.method.toLowerCase()](
    call.url,
    ...(call.middleParams || []),
    (req, res) => { setTimeout(() => call.handler(req, res), delay); },
  );
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
