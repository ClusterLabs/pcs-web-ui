/* eslint-disable import/no-extraneous-dependencies */
const express = require("express");

const app = express();

const scenarioByName = (scenarioName) => {
  const [sceneName, particularScenario] = scenarioName.split(".");
  const scenarioFile = (
    `../src/app/scenes/${sceneName}/test/backend-scenarios.js`
  );
  /* eslint-disable global-require, import/no-dynamic-require */
  const scenarioMap = require(scenarioFile);
  return scenarioMap[particularScenario];
};

const runScenario = (scenarioName) => {
  scenarioByName(scenarioName).forEach((call) => {
    app[call.method.toLowerCase()](
      call.url,
      (req, res) => { setTimeout(() => call.handler(req, res), 1000); },
    );
  });

  return app;
};

module.exports = {
  run: runScenario,
};
