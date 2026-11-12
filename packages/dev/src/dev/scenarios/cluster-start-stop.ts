import {app} from "dev/app";
import * as t from "dev/responses/clusterStatus/tools";
import * as shortcut from "dev/shortcuts";

app.clusterStart((_req, res) => {
  res.send("Some output");
});

app.clusterStop((_req, res) => {
  res.send("Some output");
});

shortcut.clusterStatus(t.cluster("ok"));
shortcut.clusterRelated();
