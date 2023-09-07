import {app} from "dev/app";
import * as response from "dev/responses";
import * as shortcut from "dev/shortcuts";

shortcut.checkAuthAgainstNodes();

shortcut.authGuiAgainstNodes();

app.removeCluster((req, res) => {
  if ("clusterid-conflict" in req.body) {
    res
      .status(400)
      .send(
        [
          "Configuration conflict detected.",
          "Some nodes had a newer configuration than the local node."
            + " Local node's configuration was updated."
            + "  Please repeat the last action if appropriate.",
        ].join("\n\n"),
      );
    return;
  }

  if ("clusterid-nodes-error" in req.body) {
    res
      .status(400)
      .send(
        "Unable to save settings on local cluster node(s) node-1, node-2."
          + " Make sure pcsd is running on the nodes and the nodes are"
          + " authorized.",
      );
    return;
  }

  res.send("");
});

shortcut.dashboard([
  response.buildClusterStatus.ok("ok"),
  response.buildClusterStatus.ok("conflict"),
  response.buildClusterStatus.ok("nodes-error"),
]);
