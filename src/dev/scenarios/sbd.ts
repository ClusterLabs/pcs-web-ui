import { app } from "dev/app";
import * as response from "dev/responses";
import * as t from "dev/responses/clusterStatus/tools";
import * as shortcut from "dev/shortcuts";

app.libCluster("sbd-enable-sbd", (req, res) => {
  if (req.params.clusterName === "error") {
    res.status(400).send("Error enabling sbd");
    return;
  }
  shortcut.libStd({
    code: Object.values(req.body.watchdog_dict).some(w => w === "offline")
      ? "offline-nodes"
      : "ok",
    res,
    errors: {
      "offline-nodes": [
        {
          severity: { level: "ERROR", force_code: "SKIP_OFFLINE_NODES" },
          message: {
            code: "DEFAULT_FORCIBLE_ERROR",
            message: "Default forcible error from devel server",
            payload: { error: "default" },
          },
          context: null,
        },
      ],
    },
  });
});

app.libCluster("sbd-disable-sbd", (req, res) => {
  if (req.params.clusterName === "error") {
    res.status(400).send("Error disabling sbd");
    return;
  }
  shortcut.libStd({
    code: req.body.ignore_offline_nodes,
    res,
  });
});

shortcut.dashboard([
  t.cluster("error", "error", {
    node_list: [
      t.node("1", { sbd_config: null }),
      t.node("2", { status: "offline", quorum: false }),
      t.node("3", { status: "unknown" }),
    ],
  }),
  response.clusterStatus.sbd,
]);
