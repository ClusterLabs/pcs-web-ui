import {app} from "dev/app";
import * as response from "dev/responses";
import * as t from "dev/responses/clusterStatus/tools";
import * as shortcut from "dev/shortcuts";

type LibStdErrors = Exclude<
  Parameters<typeof shortcut.libStd>[0]["errors"],
  undefined
>;
type LibReport = LibStdErrors[keyof LibStdErrors][number];

const offlineNodesReport: LibReport = {
  severity: {level: "ERROR", force_code: "SKIP_OFFLINE_NODES"},
  message: {
    code: "DEFAULT_FORCIBLE_ERROR",
    message: "Default forcible error from devel server",
    payload: {error: "default"},
  },
  context: null,
};

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
    errors: {"offline-nodes": [offlineNodesReport]},
  });
});

app.libCluster("sbd-disable-sbd", (req, res) => {
  if (req.params.clusterName === "error") {
    res.status(400).send("Error disabling sbd");
    return;
  }

  const nameErrMap = {
    "error-offline": "offline-nodes",
    "forceable-sbd-disable": "no-stonith-means-would-be-left",
  };

  shortcut.libStd({
    code: nameErrMap[req.params.clusterName as keyof typeof nameErrMap] ?? "ok",
    res,
    errors: {
      "offline-nodes": [offlineNodesReport],
      "no-stonith-means-would-be-left": [
        {
          severity: {level: "ERROR", force_code: "FORCE"},
          message: {
            code: "NO_STONITH_MEANS_WOULD_BE_LEFT",
            message:
              "Requested action lefts the cluster with no enabled means to" +
              " fence nodes, resulting in the cluster not being able to recover" +
              " from certain failure conditions",
            payload: {},
          },
          context: null,
        },
      ],
    },
  });
});

shortcut.dashboard([
  t.cluster("error", "error", {
    node_list: [
      t.node("1", {sbd_config: null}),
      t.node("2", {status: "offline", quorum: false}),
      t.node("3", {status: "unknown"}),
    ],
  }),
  t.cluster("forceable-sbd-disable", "error", {
    node_list: [
      t.node("1", {sbd_config: null}),
      t.node("2", {status: "offline", quorum: false}),
      t.node("3", {status: "unknown"}),
    ],
  }),
  t.cluster("error-offline", "error", {
    node_list: [
      t.node("1", {sbd_config: null}),
      t.node("2", {status: "offline", quorum: false}),
      t.node("3", {status: "unknown"}),
    ],
  }),
  response.clusterStatus.sbd,
]);
