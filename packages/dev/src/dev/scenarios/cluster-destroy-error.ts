import {app} from "dev/app";
import * as response from "dev/responses";
import * as shortcut from "dev/shortcuts";

app.destroyCluster((_req, res) => {
  res.status(400).send("Error: cannot destroy the cluster.");
});

shortcut.clusterStatus(response.clusterStatus.resourceTree);
shortcut.clusterRelated();
