import {app} from "dev/app";
import * as response from "dev/responses";
import * as shortcut from "dev/shortcuts";

const offlineNodesReport: shortcut.LibReport = {
  severity: {level: "ERROR", force_code: "SKIP_OFFLINE_NODES"},
  message: {
    code: "DEFAULT_FORCIBLE_ERROR",
    message: "Default forcible error from devel server",
    payload: {error: "default"},
  },
  context: null,
};

app.libCluster("sbd-enable-sbd", (req, res) => {
  shortcut.libStd({
    code: Object.values(req.body.watchdog_dict).some(w => w === "offline")
      ? "offline-nodes"
      : "ok",
    res,
    errors: {"offline-nodes": [offlineNodesReport]},
  });
});

app.libCluster("sbd-disable-sbd", (_req, res) => {
  res.json(response.lib.success());
});

shortcut.clusterStatus(response.clusterStatus.sbd);
shortcut.clusterRelated();
