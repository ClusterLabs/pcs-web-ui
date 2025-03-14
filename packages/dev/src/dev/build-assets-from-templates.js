import {
  applyReplacements,
  linkCss,
  linkJs,
  prefixAssetsPaths,
} from "../../../app/.bin/build/fix_assets_in_index.js";

export {applyReplacements, linkCss, linkJs, prefixAssetsPaths};

export const injectLiveReloadCapability = ({port}) => {
  return [
    "</head>",
    "  <script>\n" +
      `      const dev_ws = new WebSocket('ws://localhost:${port}')\n` +
      "      dev_ws.onmessage = (event) => {\n" +
      "        if (event.data === 'reload') {\n" +
      "          window.location.reload()\n" +
      "        }\n" +
      "      }\n" +
      "    </script>\n" +
      "  </head>\n",
  ];
};
