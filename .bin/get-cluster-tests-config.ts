import { existsSync, readFileSync } from "fs"

const configFilePath = ".dev/cluster-test-conf.json"
const defaultConfigFilePath = "cluster-test-conf.default.json"

// TODO deal with invalid JSON
const config = JSON.parse(
  readFileSync(
    existsSync(configFilePath) ? configFilePath : defaultConfigFilePath
  ).toString("utf8")
)

console.log(JSON.stringify(config))
