import { app } from "dev/app";
import * as response from "dev/responses";
import * as shortcut from "dev/shortcuts";

shortcut.dashboard([response.clusterStatus.noAuthNodes]);

shortcut.authGuiAgainstNodes();

app.fixAuthOfCluster((_req, res) => {
  res.send("Auhentication of nodes in cluster should be fixed.");
});
