import {app} from "dev/app";
import * as shortcut from "dev/shortcuts";

shortcut.dashboard([]);

app.canAddClusterOrNodes((req, res) => {
  if (!("node_names" in req.query)) {
    res
      .status(500)
      .send("Wrong request - missing node_names[] - it's a programming error!");
  }
  const nodeNameList: string[] = req.query.node_names as string[];
  const errors = nodeNameList
    .filter(nodeName => nodeName.startsWith("canNo"))
    .map(
      nodeName =>
        `The node '${nodeName}' is already a part of the 'ClusterName' cluster.`
        + " You may not add a node to two different clusters.",
    );

  if (errors.length > 0) {
    res.status(400).send(errors.join("\n"));
    return;
  }
  if (nodeNameList.some(nodeName => nodeName === "canErr")) {
    res.status(500).send("Error during checking if can add node to cluster");
    return;
  }
  res.send("");
});

shortcut.checkAuthAgainstNodes({
  //nodeName: checkValue
  authNonsense: "nonsense",
  authUnable: "Unable to authenticate",
  authOffline: "Offline",
  authOfflineA: "Offline",
  authOfflineB: "Offline",
  //authErr: responds 500
  //any other: Online
});

shortcut.authGuiAgainstNodes();

app.sendKnownHostsToNode((_req, res) => {
  res.send("success");
});

app.clusterSetup((req, res) => {
  const setupData = JSON.parse(req.body.setup_data);
  shortcut.libStd({
    code: setupData.cluster_name,
    res,
  });
});

app.rememberCluster((_req, res) => {
  res.send("");
});

app.clusterStart((req, res) => {
  if (req.body.name === "fail") {
    res.status(500).send("Something wrong");
    return;
  }
  if (req.body.name === "permission") {
    res.status(403).send("Permission denied");
    return;
  }

  if (req.body.name === "error") {
    res.status(400).send("Unable to start node.");
    return;
  }

  res.send("Some output");
});
