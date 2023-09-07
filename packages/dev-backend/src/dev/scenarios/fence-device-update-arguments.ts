import {app} from "dev/app";
import * as response from "dev/responses";
import * as shortcut from "dev/shortcuts";

app.updateFenceDevice((req, res) => {
  const actionAttribute = req.body._res_paramne_action;
  let result = {};
  if (actionAttribute === "fail") {
    res.status(500).send("SOMETHING WRONG");
    return;
  }

  if (actionAttribute === "invalid") {
    result = "invalid";
  } else if (actionAttribute === "err") {
    result = {
      error: "true",
      stderr: "Stderr output",
      stdout: "Stdout output",
    };
  }
  res.json(result);
});

shortcut.dashboard([response.clusterStatus.resourceTree]);
