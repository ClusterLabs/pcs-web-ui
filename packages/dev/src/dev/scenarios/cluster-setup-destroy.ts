import {app} from "dev/app";
import * as response from "dev/responses";
import * as shortcut from "dev/shortcuts";

shortcut.getSetupClusterRelated();

app.destroyCluster((_req, res) => {
  res.send("");
});

shortcut.clusterStatus(response.clusterStatus.resourceTree);
shortcut.clusterRelated();
