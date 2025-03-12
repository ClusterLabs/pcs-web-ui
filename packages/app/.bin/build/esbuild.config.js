import path from "node:path";
import {readFile} from "node:fs/promises";
import structure from "./structure.json" with {type: "json"};

export const getConfig = async ({
  srcDir,
  outputDir,
  publicPath,
  nodeModules,
  shouldUseSourceMap,
}) => {
  const {app, output} = structure;

  const tsConfigPath = path.join(srcDir, app.tsConfig);
  const tsConfig = JSON.parse(await readFile(tsConfigPath, "utf-8"));
  const envForApp = {NODE_ENV: process.env.NODE_ENV};

  return {
    entryPoints: [path.join(srcDir, app.index)],
    bundle: true,
    minify: true,
    minifySyntax: true,
    minifyWhitespace: true,
    minifyIdentifiers: true,
    sourcemap: shouldUseSourceMap,
    outdir: path.join(outputDir, output.static),
    publicPath,
    assetNames: `${output.media.slice(output.static.length)}/[name]`,
    entryNames: `${output.main}.[hash]`,
    format: "esm",
    // Prepare env variables visible (compiled) in bundle
    define: Object.fromEntries(
      Object.entries(envForApp).map(([key, value]) => [
        `process.env.${key}`,
        JSON.stringify(value),
      ]),
    ),
    loader: {
      ".js": "tsx",
      ".ts": "tsx",
      ".tsx": "tsx",
      ".jsx": "tsx",
      ".css": "css",
      ".png": "file",
      ".jpg": "file",
      ".gif": "file",
      ".bmp": "file",
      ".woff": "file",
      ".woff2": "file",
    },
    metafile: true,
    tsconfig: tsConfigPath,
    logLevel: "error",
    resolveExtensions: [".tsx", ".ts", ".jsx", ".js", ".mjs", ".cjs"],
    absWorkingDir: path.join(srcDir, tsConfig.compilerOptions.baseUrl),
    nodePaths: [nodeModules],
  };
};
