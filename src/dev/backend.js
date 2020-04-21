/* eslint-disable import/no-extraneous-dependencies, no-console */
/* eslint-disable global-require, import/no-dynamic-require */
const express = require("express");
const fs = require("fs");
const childProcess = require("child_process");
const inquirer = require("inquirer");
const { argv } = require("yargs")
  .string("scenario")
  .number("delay")
  .default("delay", 300)
  .number("delayRandom")
  .default("delayRandom", 100);

const SCENARIO_DIR = `${__dirname}/scenarios`;

const getScenarios = () =>
  fs
    .readdirSync(SCENARIO_DIR)
    .reduce(
      (scenarioList, fileName) => [
        ...scenarioList,
        ...Object.keys(require(`${SCENARIO_DIR}/${fileName}`)).map(
          scenario => `${fileName.replace(/\.[^/.]+$/, "")}.${scenario}`,
        ),
      ],
      [],
    );

class Scenario {
  /* eslint-disable no-underscore-dangle */
  constructor(name) {
    this.name = name;
    const [scene, scenario] = name.split(".");
    this.scene = scene;
    this.scenario = scenario;
    this.__loadedScenarioMap = undefined;
  }

  get exists() {
    return this.__scenarioMap[this.scenario] !== undefined;
  }

  get handlers() {
    if (!this.exists) {
      throw new Error(`Scenario ${this.name} does not exists.`);
    }
    return this.__scenarioMap[this.scenario];
  }

  get __scenarioFile() {
    return `${SCENARIO_DIR}/${this.scene}.js`;
  }

  get __scenarioMap() {
    if (this.__loadedScenarioMap === undefined) {
      this.__loadedScenarioMap = fs.existsSync(this.__scenarioFile)
        ? require(this.__scenarioFile)
        : {};
    }
    return this.__loadedScenarioMap;
  }
}

const runServer = (scenarioName) => {
  childProcess.execSync(
    `npx nodemon --watch src/ src/dev/backend.js --scenario=${scenarioName}`,
    { stdio: ["inherit", "inherit", "inherit"] },
  );
};

const promptScenario = () =>
  inquirer
    .prompt([
      {
        type: "list",
        name: "scenario",
        message: "Please select scenario",
        choices: getScenarios(),
      },
    ])
    .then(answers => answers.scenario)
    .then(runServer)
    .catch(() => {
      process.exit(0);
    });
const addAppHandlers = (app, scenarioHandlers, delay, delayRandom) => {
  scenarioHandlers.forEach(({ method, url, middleParams, handler }) => {
    app[method.toLowerCase()](url, ...(middleParams || []), (req, res) => {
      setTimeout(
        () => handler(req, res),
        delay + Math.floor(delayRandom * Math.random()),
      );
    });
  });
};

/* eslint-disable no-shadow */
((argv) => {
  const scenario = new Scenario(argv.scenario || "");
  if (!scenario.exists) {
    console.log(`Scenario "${scenario.name}" does not exist`);
    if (argv.interactive) {
      promptScenario();
    } else {
      getScenarios().forEach(scenario => console.log(scenario));
    }
    return;
  }
  if (argv.interactive) {
    runServer(scenario.name);
    return;
  }
  const port = process.env.PORT || 5000;
  const app = express();
  addAppHandlers(app, scenario.handlers, argv.delay, argv.delayRandom);
  app.listen(port, () => console.log(`Listening on port ${port}`));
})(argv);
