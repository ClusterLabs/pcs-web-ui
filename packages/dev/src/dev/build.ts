import fs from "node:fs";
import path from "node:path";
import * as esbuild from "esbuild";
import {getConfig} from "../../../app/.bin/build/esbuild.config.js";
import {structure} from "../../../app/.bin/build/structure.js";
import * as indexBuild from "./build-assets-from-templates.js";

process.env.NODE_ENV = "development";

export const startBuild = async ({
  srcDir,
  outputDir,
  app_node_modules,
  port,
}: {
  srcDir: string;
  outputDir: string;
  app_node_modules: string;
  port: number | string;
}) => {
  const templateDir = path.join(srcDir, structure.template.dir);
  const staticDir = path.join(outputDir, structure.output.static);

  const refreshStaticFiles = async () => {
    fs.cpSync(templateDir, outputDir, {recursive: true, force: true});

    const staticDirName = structure.output.static;
    const assetPrefix = structure.output.main;

    const assetList = fs.readdirSync(staticDir);

    indexBuild.applyReplacements(
      path.join(outputDir, structure.template.index),
      [
        // Order is very important here! Replacements linkCSS and linkJs are
        // oriented by <script...> placeholder; prefix and linkJs modifies it.
        indexBuild.linkCss({assetList, staticDirName, assetPrefix}),
        indexBuild.linkJs({assetList, staticDirName, assetPrefix}),
        indexBuild.prefixAssetsPaths({
          pathPrefix: "/ui",
          staticDirName,
          manifest: structure.template.manifest,
          ico: structure.template.ico,
        }),
        indexBuild.injectLiveReloadCapability({port}),
      ],
    );
  };

  const config = (await getConfig({
    srcDir,
    outputDir,
    publicPath: "./",
    nodeModules: app_node_modules,
    shouldUseSourceMap: true,
  })) as esbuild.BuildOptions;

  const ctx = await esbuild.context({
    ...config,
    plugins: [
      {
        name: "clean-and-refresh-static",
        setup({onStart, onEnd}) {
          onStart(() => fs.rmSync(staticDir, {recursive: true, force: true}));
          onEnd(refreshStaticFiles);
        },
      },
    ],
  });
  await ctx.watch();

  fs.watch(templateDir, refreshStaticFiles);
};
