import {app} from "dev/app";
import * as response from "dev/responses";
import * as shortcut from "dev/shortcuts";

app.clusterStatus((_req, res) => {
  res.json(response.clusterStatus.resourceTree);
});

shortcut.clusterRelated();
