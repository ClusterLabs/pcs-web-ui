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

shortcut.dashboard([response.clusterStatus.ok]);
