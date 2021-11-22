import { app } from "dev/app";
import * as response from "dev/responses";
import * as shortcut from "dev/shortcuts";

app.getPermissions((_req, res) => {
  res.json(
    response.permissions({
      users_permissions: [{ type: "user", name: "name", allow: ["read"] }],
    }),
  );
});

app.permissionsSave((req, res) => {
  if ("name" === req.body.permissions[0].name) {
    res.status(400).send("Error removing permission haclient");
    return;
  }
  res.send("");
});

shortcut.dashboard([response.clusterStatus.clusterOk("ok")]);
