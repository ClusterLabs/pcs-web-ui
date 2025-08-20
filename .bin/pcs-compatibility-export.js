const fs = require("node:fs");

const uniq = a => [...new Set(a)];
const row = (ui, pcs) => `|[${ui}]|` + pcs.map(v => `[${v}]`).join(", ") + "|";
const link = (version, url) => `[${version}]: ${url}/${version}`;
const url = {
  ui: "https://github.com/ClusterLabs/pcs-web-ui/releases/tag",
  pcs: "https://github.com/ClusterLabs/pcs/releases/tag",
};

const versionMap = JSON.parse(
  fs.readFileSync(".bin/pcs-compatibility.json", "utf8"),
);

const {rows, links} = Object.entries(versionMap).reduce(
  ({rows, links}, [ui, pcs]) => ({
    rows: [...rows, row(ui, pcs)],
    links: {
      ui: [...links.ui, link(ui, url.ui)],
      pcs: [...links.pcs, ...pcs.map(v => link(v, url.pcs))],
    },
  }),
  {rows: [], links: {ui: [], pcs: []}},
);

// Empty line there to be table end recognizable by markdown renderers.
const docContent = `# PCS version compatibility
| pcs-web-ui | pcs |
|------------|-----|
${rows.join("\n")}

${links.ui.join("\n")}
${uniq(links.pcs).join("\n")}
`;

fs.writeFileSync("doc/pcs-compatibility.md", docContent);
