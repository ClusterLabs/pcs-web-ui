import {app} from "dev/app";
import * as t from "dev/responses/clusterStatus/tools";
import * as response from "dev/responses";
import * as shortcut from "dev/shortcuts";

shortcut.dashboard([
  t.cluster("acls", "ok", {
    node_list: [
      t.node("1", {sbd_config: null}),
      t.node("2", {status: "offline", quorum: false}),
      t.node("3", {status: "unknown"}),
    ],
    acls: response.acl.firstSet,
    cluster_settings: {
      "enable-acl": "true",
    },
  }),
  response.clusterStatus.ok,
]);

app.libCluster("acl-create-role", (req, res) => {
  shortcut.libStd({
    code: req.body.role_id,
    res,
  });
});

app.libCluster("acl-create-target", (req, res) => {
  shortcut.libStd({
    code: req.body.target_id,
    res,
  });
});

app.libCluster("acl-create-group", (req, res) => {
  shortcut.libStd({
    code: req.body.group_id,
    res,
  });
});

app.libCluster("acl-assign-role-to-target", (req, res) => {
  shortcut.libStd({
    code: req.body.role_id,
    res,
  });
});

app.libCluster("acl-assign-role-to-group", (req, res) => {
  shortcut.libStd({
    code: req.body.role_id,
    res,
  });
});

app.libCluster("acl-remove-target", (req, res) => {
  shortcut.libStd({
    code: req.body.target_id,
    res,
  });
});

app.libCluster("acl-remove-role", (req, res) => {
  shortcut.libStd({
    code: req.body.role_id,
    res,
  });
});

app.libCluster("acl-remove-group", (req, res) => {
  shortcut.libStd({
    code: req.body.group_id,
    res,
  });
});

app.libCluster("acl-remove-permission", (req, res) => {
  shortcut.libStd({
    code: req.body.role_id,
    res,
  });
});

app.libCluster("acl-unassign-role-from-target", (req, res) => {
  shortcut.libStd({
    code: req.body.target_id,
    res,
  });
});

app.libCluster("acl-unassign-role-from-group", (req, res) => {
  shortcut.libStd({
    code: req.body.group_id,
    res,
  });
});

app.updateClusterSettings((_req, res) => {
  res.send("Update Successful");
});
