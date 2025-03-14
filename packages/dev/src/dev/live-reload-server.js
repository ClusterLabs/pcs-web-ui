//import {promises as fs} from "node:fs";
import fs from "node:fs";
import {WebSocketServer} from "ws";

export const prepareLiveReloadServer = (server, appLocation) => {
  const wss = new WebSocketServer({server});

  wss.on("connection", ws => {
    console.log("Live reload client connected");

    fs.watch(appLocation, {recursive: false}, (_eventType, filename) => {
      // Rebuild assets triggers refreshing index.html. With adapter.js they are
      // the only devel relevant files.
      if (filename === "index.html" || filename.endsWith("/adapter.js")) {
        ws.send("reload");
      }
    });
  });
};
