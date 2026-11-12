import {app} from "dev/app";
import * as response from "dev/responses";
import * as shortcut from "dev/shortcuts";

shortcut.authGuiAgainstNodes();

app.fixAuthOfCluster((_req, res) => {
  res
    .status(400)
    .send(
      "Old version of PCS/PCSD is running on cluster nodes." +
        " Fixing authentication is not supported." +
        " Use 'pcs host auth' command to authenticate the nodes.",
    );
});

shortcut.clusterStatus(response.clusterStatus.noAuthNodes);
shortcut.clusterRelated();
