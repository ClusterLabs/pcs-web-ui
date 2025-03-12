import fs from "node:fs";
import path from "node:path";
import * as esbuild from "esbuild";
import {getConfig} from "../../../app/.bin/build/esbuild.config.js";
import structure from "../../../app/.bin/build/structure.json";
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

  const refreshStaticFiles = async () => {
    fs.cpSync(templateDir, outputDir, {
      recursive: true,
      force: true,
    });

    const staticDirName = structure.output.static;
    const assetPrefix = structure.output.main;

    const assetList = fs.readdirSync(
      path.join(outputDir, structure.output.static),
    );

    indexBuild.applyReplacements(
      path.join(outputDir, structure.template.index),
      [
        // Order is very important here! Replacements linkCSS and linkJs are
        // oriented by <script...> placeholder and prefixing and linkJs modifies
        // it.
        indexBuild.linkCss({
          assetList,
          staticDirName,
          assetPrefix,
        }),
        indexBuild.linkJs({
          assetList,
          staticDirName,
          assetPrefix,
        }),
        indexBuild.prefixAssetsPaths({
          pathPrefix: "/ui",
          staticDirName,
          manifest: structure.template.manifest,
          ico: structure.template.ico,
        }),
        indexBuild.injectLiveReloadCapability({
          port,
        }),
      ],
    );
  };

  const config = (await getConfig({
    srcDir,
    outputDir,
    // webpack needs to know it to put the right <script> hrefs into HTML even
    // in single-page apps that may serve index.html for nested URLs like
    // /todos/42. We can't use a relative path in HTML because we don't want
    // to load something like /todos/42/static/js/bundle.7289d.js. We have to
    // know the root.
    publicPath: "./",
    nodeModules: app_node_modules,
    shouldUseSourceMap: true,
  })) as esbuild.BuildOptions;

  const ctx = await esbuild.context(config);

  await ctx.rebuild();
  await refreshStaticFiles();

  await ctx.watch();

  // After recompilation.
  fs.watch(
    path.join(outputDir, structure.output.static),
    async (_eventType, filename) => {
      // TODO This is "throtling" for very poor...
      if (filename.endsWith(".js") || filename.endsWith(".css")) {
        await refreshStaticFiles();
      }
    },
  );

  // After templates (e.g. packages/app/public/index.html) change.
  fs.watch(templateDir, async () => await refreshStaticFiles());
};
