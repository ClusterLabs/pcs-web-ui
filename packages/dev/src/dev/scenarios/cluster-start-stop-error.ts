import {app} from "dev/app";
import * as t from "dev/responses/clusterStatus/tools";
import * as shortcut from "dev/shortcuts";

app.clusterStart((_req, res) => {
  res.status(400).send("Unable to start node.");
});

app.clusterStop((_req, res) => {
  res.status(400).send("Unable to stop node.");
});

shortcut.clusterStatus(t.cluster("error"));
shortcut.clusterRelated();
