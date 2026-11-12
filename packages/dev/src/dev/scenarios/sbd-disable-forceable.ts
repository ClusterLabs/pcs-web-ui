import {app} from "dev/app";
import * as response from "dev/responses";
import * as t from "dev/responses/clusterStatus/tools";
import * as shortcut from "dev/shortcuts";

app.libCluster("sbd-disable-sbd", (_req, res) => {
  res.json(
    response.lib.error([
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
    ]),
  );
});

shortcut.clusterStatus(
  t.cluster("forceable-sbd-disable", "error", {
    node_list: [
      t.node("1", {sbd_config: null}),
      t.node("2", {status: "offline", quorum: false}),
      t.node("3", {status: "unknown"}),
    ],
  }),
);
shortcut.clusterRelated();
