import {app} from "dev/app";
import * as response from "dev/responses";
import * as shortcut from "dev/shortcuts";

shortcut.authGuiAgainstNodes();

app.fixAuthOfCluster((_req, res) => {
  res.send("Authentication of nodes in cluster should be fixed.");
});

shortcut.clusterStatus(response.clusterStatus.noAuthNodes);
shortcut.clusterRelated();
