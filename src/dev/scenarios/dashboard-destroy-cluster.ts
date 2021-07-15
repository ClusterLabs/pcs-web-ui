import { app } from "dev/app";
import * as response from "dev/responses";
import * as shortcut from "dev/shortcuts";

shortcut.checkAuthAgainstNodes();

shortcut.authGuiAgainstNodes();

app.destroyCluster((req, res) => {
  if (req.params.clusterName === "error") {
    res.status(400).send("Error: cannot destroy the cluster.");
    return;
  }

  res.send("");
});

shortcut.dashboard([
  response.clusterStatus.clusterOk("ok"),
  response.clusterStatus.clusterOk("error"),
]);
