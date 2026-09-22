import * as shortcut from "dev/shortcuts";
import {app} from "dev/app";

shortcut.clusterRelated();

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

shortcut.checkAuthAgainstNodes();

shortcut.authGuiAgainstNodes();

app.sendKnownHosts((_req, res) => {
  res.send("success");
});

app.libCluster("cluster-add-nodes", (req, res) => {
  shortcut.libStd({
    code: req.body.nodes[0]?.name,
    res,
  });
});
