import {app} from "dev/app";
import * as t from "dev/responses/clusterStatus/tools";
import * as shortcut from "dev/shortcuts";

app.libCluster("sbd-enable-sbd", (_req, res) => {
  res.status(400).send("Error enabling sbd");
});

app.libCluster("sbd-disable-sbd", (_req, res) => {
  res.status(400).send("Error disabling sbd");
});

shortcut.clusterStatus(
  t.cluster("error", "error", {
    node_list: [
      t.node("1", {sbd_config: null}),
      t.node("2", {status: "offline", quorum: false}),
      t.node("3", {status: "unknown"}),
    ],
  }),
);
shortcut.clusterRelated();
