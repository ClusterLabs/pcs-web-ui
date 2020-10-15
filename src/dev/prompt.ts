/* eslint-disable import/no-dynamic-require */
import * as childProcess from "child_process";
import * as fs from "fs";
import { dirname } from "path";

import * as inquirer from "inquirer";

export const DEV_DIR = dirname(__filename);
export const SCENARIO_DIR = `${DEV_DIR}/scenarios`;

const getScenarios = (): string[] =>
  fs
    .readdirSync(SCENARIO_DIR)
    .filter(s => fs.lstatSync(`${SCENARIO_DIR}/${s}`).isFile())
    .map(fileName => fileName.replace(/\.[^/.]+$/, ""));

inquirer
  .prompt({
    type: "list",
    name: "scenario",
    message: "Please select scenario",
    choices: getScenarios(),
  })
  .then((answers: inquirer.Answers) => {
    const cmd =
      `SCENARIO=${answers.scenario}`
      + " npx ts-node-dev -r tsconfig-paths/register -r esm"
      + " --respawn --transpile-only --rs"
      + ` ${SCENARIO_DIR}/${answers.scenario}.ts`;

    childProcess.execSync(cmd, { stdio: ["inherit", "inherit", "inherit"] });
  })
  .catch((error) => {
    if (error.isTtyError) {
      /* eslint-disable-next-line no-console */
      console.log("Prompt couldn't be rendered in the current environment");
      process.exit(0);
    } else {
      process.exit(0);
    }
  });
