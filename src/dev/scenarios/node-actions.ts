import * as response from "dev/responses";
import * as shortcut from "dev/shortcuts";
import {app} from "dev/app";

app.libCluster("node-standby-unstandby", (req, res) =>
  shortcut.libStd({code: req.body.node_names[0], res}),
);

app.libCluster("node-maintenance-unmaintenance", (req, res) =>
  shortcut.libStd({code: req.body.node_names[0], res}),
);

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

app.clusterStop((req, res) => {
  if (req.body.name === "fail") {
    res.status(500).send("Something wrong");
    return;
  }
  if (req.body.name === "permission") {
    res.status(403).send("Permission denied");
    return;
  }

  if (req.body.name === "error") {
    res.status(400).send("Unable to stop node.");
    return;
  }

  if (req.body.name === "forceable-error") {
    res.status(400).send("Unable to stop node, use --force to override.");
    return;
  }

  res.send("Some output");
});

app.libCluster("cluster-remove-nodes", (req, res) => {
  shortcut.libStd({
    code: req.body.node_list[0],
    res,
  });
});

shortcut.dashboard([
  response.clusterStatus.actions,
  response.clusterStatus.actionsAlternative,
]);
