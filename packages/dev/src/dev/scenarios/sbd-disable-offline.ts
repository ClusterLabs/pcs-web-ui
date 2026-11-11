import {app} from "dev/app";
import * as response from "dev/responses";
import * as t from "dev/responses/clusterStatus/tools";
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

app.libCluster("sbd-disable-sbd", (_req, res) => {
  res.json(response.lib.error([offlineNodesReport]));
});

shortcut.clusterStatus(
  t.cluster("error-offline", "error", {
    node_list: [
      t.node("1", {sbd_config: null}),
      t.node("2", {status: "offline", quorum: false}),
      t.node("3", {status: "unknown"}),
    ],
  }),
);
shortcut.clusterRelated();
