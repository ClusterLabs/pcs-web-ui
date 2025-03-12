import path from "node:path";

import * as esbuild from "esbuild";
import {getConfig} from "./esbuild.config.js";

const srcDir = process.argv[2];
const outputDir = process.argv[3];

process.env.NODE_ENV = "production";

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";
const nodeModules = process.env.NODE_PATH
  ? process.env.NODE_PATH.split(path.delimiter)
  : [];

const config = await getConfig({
  srcDir,
  outputDir,
  publicPath: "./",
  nodeModules,
  shouldUseSourceMap,
});

await esbuild.build(config);
