import * as response from "dev/responses";
import * as shortcut from "dev/shortcuts";
import {app} from "dev/app";

shortcut.dashboard([response.clusterStatus.actions]);

app.updateClusterSettings((req, res) => {
  const batchLimit = req.body.config["batch-limit"];
  if (batchLimit === "2") {
    res.status(403).send("Permission denied");
    return;
  }
  if (batchLimit === "3") {
    res.status(400).send("Something wrong");
    return;
  }
  if (batchLimit === "err") {
    res
      .status(400)
      .send(
        "Error: 'err' is not a valid batch-limit value, use number," +
          " use --force to override\n" +
          "Error: Errors have occurred, therefore pcs is unable to continue ",
      );
    return;
  }
  res.send("Update Successful");
});
