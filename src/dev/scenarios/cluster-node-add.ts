import * as shortcut from "dev/shortcuts";
import * as response from "dev/responses";
import * as app from "dev/app";

shortcut.dashboard([
  response.clusterStatus.actions,
  response.clusterStatus.actionsAlternative,
]);

app.clusterStart((req, res) => {
  if (req.body.name === "startFail") {
    res.status(500).send("Something wrong");
    return;
  }
  if (req.body.name === "startPermission") {
    res.status(403).send("Permission denied");
    return;
  }

  if (req.body.name === "startError") {
    res.status(400).send("Unable to start node.");
    return;
  }

  res.send("Some output");
});

app.canAddClusterOrNodes((req, res) => {
  if (!("node_names" in req.query)) {
    res
      .status(500)
      .send("Wrong request - missing node_names[] - it's a programming error!");
  }
  const nodeName: string = (req.query.node_names as string[])[0] as string;
  if (nodeName === "canNo") {
    res
      .status(400)
      .send(
        `The node '${nodeName}' is already a part of the 'ClusterName' cluster.`
          + " You may not add a node to two different clusters.",
      );
    return;
  }
  if (nodeName === "canErr") {
    res.status(500).send("Error during checking if can add node to cluster");
    return;
  }
  res.send("");
});

shortcut.checkAuthAgainstNodes();

shortcut.authGuiAgainstNodes();

app.sendKnownHosts((_req, res) => {
  res.send("success");
});

app.clusterAddNodes((req, res) => {
  shortcut.libStd({
    code: req.body.nodes[0]?.name,
    res,
  });
});
