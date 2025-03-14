import * as esbuild from "esbuild";
import {getConfig} from "./esbuild.config.js";

const srcDir = process.argv[2];
const nodeModules = process.argv[3];
const outputDir = process.argv[4];

process.env.NODE_ENV = "production";

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";

const config = await getConfig({
  srcDir,
  outputDir,
  publicPath: "./",
  nodeModules,
  shouldUseSourceMap,
});

await esbuild.build(config);
