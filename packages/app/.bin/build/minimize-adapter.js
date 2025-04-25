import * as esbuild from "esbuild";

const adapterPath = process.argv[2];

esbuild
  .build({
    entryPoints: [adapterPath],
    outfile: adapterPath,
    minify: true,
    format: "iife",
    allowOverwrite: true,
    logLevel: "error",
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
