import {app} from "dev/app";
import * as shortcut from "dev/shortcuts";

shortcut.clusterRelated();

app.libCluster("resource-move-autoclean", (req, res) => {
  shortcut.libStd({
    code: req.body.resource_id,
    res,
  });
});

app.libCluster("resource-move", (req, res) => {
  shortcut.libStd({
    code: req.body.resource_id,
    res,
  });
});

app.libCluster("resource-ban", (req, res) => {
  shortcut.libStd({
    code: req.body.resource_id,
    res,
  });
});

app.libCluster("resource-unmove-unban", (req, res) => {
  shortcut.libStd({
    code: req.body.resource_id,
    res,
  });
});
