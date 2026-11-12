import {app} from "dev/app";
import * as t from "dev/responses/clusterStatus/tools";
import * as shortcut from "dev/shortcuts";

app.clusterStart((_req, res) => {
  res.status(403).send("Permission denied");
});

app.clusterStop((_req, res) => {
  res.status(403).send("Permission denied");
});

shortcut.clusterStatus(t.cluster("permission"));
shortcut.clusterRelated();
