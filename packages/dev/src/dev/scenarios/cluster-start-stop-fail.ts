import {app} from "dev/app";
import * as t from "dev/responses/clusterStatus/tools";
import * as shortcut from "dev/shortcuts";

app.clusterStart((_req, res) => {
  res.status(500).send("Something wrong");
});

app.clusterStop((_req, res) => {
  res.status(500).send("Something wrong");
});

shortcut.clusterStatus(t.cluster("fail"));
shortcut.clusterRelated();
