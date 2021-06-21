import * as response from "dev/responses";
import * as shortcut from "dev/shortcuts";
import { app } from "dev/app";

shortcut.dashboard([response.clusterStatus.actions]);

app.updateClusterSettings((req, res) => {
  const batchLimit = req.body.config["batch-limit"];
  console.log(batchLimit);
  if (batchLimit === "2") {
    res.status(403).send("Permission denied");
    return;
  }
  if (batchLimit === "3") {
    res.status(400).send("Somethig wrong");
    return;
  }
  res.send("Update Successful");
});
