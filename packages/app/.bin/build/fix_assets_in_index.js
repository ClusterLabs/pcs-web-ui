import path from "node:path";
import fs from "node:fs";
import {fileURLToPath} from "node:url";

import {structure} from "./structure.js";

export const applyReplacements = (file, replacementPairs) =>
  fs.writeFileSync(
    file,
    replacementPairs.reduce(
      (content, [pattern, replace]) => content.replace(pattern, replace),
      fs.readFileSync(file, "utf8"),
    ),
    "utf8",
  );

// WARNING: Don't use relative path in standalone mode. In the cluster detail
// (url: /ui/cluster) instead of /ui/static/... we get /ui/cluster/static.
// See: https://bugzilla.redhat.com/show_bug.cgi?id=2222788
export const prefixAssetsPaths = ({
  staticDirName,
  pathPrefix,
  manifest,
  ico,
}) => [
  new RegExp(`(src|href)="\\/(${staticDirName}|${manifest}|${ico})`, "g"),
  `$1="${pathPrefix}/$2`,
];

export const linkCss = ({assetList, staticDirName, assetPrefix}) => {
  const jsPlaceholderRegExp = getJsPlaceholderRegExp({
    staticDirName,
    assetPrefix,
  });

  const cssAsset = findAsset("css", assetPrefix, assetList, staticDirName);

  return [
    new RegExp(`(<script\\s+[^>]*${jsPlaceholderRegExp}[^>]*><\\/script>)`),
    `$1\n    <link href="${cssAsset}" rel="stylesheet">`,
  ];
};

export const linkJs = ({assetList, staticDirName, assetPrefix}) => {
  const jsPlaceholderRegExp = getJsPlaceholderRegExp({
    staticDirName,
    assetPrefix,
  });
  const jsAsset = findAsset("js", assetPrefix, assetList, staticDirName);
  return [new RegExp(jsPlaceholderRegExp, "g"), `src="${jsAsset}"`];
};

const findAsset = (ext, assetPrefix, assetList, staticDirName) => {
  const regex = new RegExp(`^${assetPrefix}\\..+\\.${ext}$`);
  const asset = assetList.find(f => regex.test(f));
  if (!asset) {
    throw new Error(`No asset with extension ${ext} found`);
  }
  return `/${staticDirName}/${asset}`;
};

const getJsPlaceholderRegExp = ({staticDirName, assetPrefix}) =>
  `src="/${staticDirName}/${assetPrefix}\\.js"`;

// To execute in CLI -----------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  const outputDir = process.argv[2];
  const pathPrefix = process.argv[3];

  const assetList = fs.readdirSync(
    path.join(outputDir, structure.output.static),
  );

  const staticDirName = structure.output.static;
  const assetPrefix = structure.output.main;

  applyReplacements(path.join(outputDir, structure.template.index), [
    // Order is very important here! Replacements linkCSS and linkJs are
    // oriented by <script...> placeholder and prefixing and linkJs modifies it.
    linkCss({assetList, staticDirName, assetPrefix}),
    linkJs({assetList, staticDirName, assetPrefix}),
    prefixAssetsPaths({
      pathPrefix,
      staticDirName,
      manifest: structure.template.manifest,
      ico: structure.template.ico,
    }),
  ]);
}
