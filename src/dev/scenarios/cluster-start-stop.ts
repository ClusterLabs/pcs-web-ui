import * as t from "dev/responses/clusterStatus/tools";
import * as shortcut from "dev/shortcuts";
import { app } from "dev/app";

app.clusterStart((req, res) => {
  if (req.params.clusterName === "fail") {
    res.status(500).send("Something wrong");
    return;
  }
  if (req.params.clusterName === "permission") {
    res.status(403).send("Permission denied");
    return;
  }

  if (req.params.clusterName === "error") {
    res.status(400).send("Unable to start node.");
    return;
  }

  res.send("Some output");
});

shortcut.dashboard([
  t.cluster("ok"),
  t.cluster("fail"),
  t.cluster("permission"),
  t.cluster("error"),
]);
