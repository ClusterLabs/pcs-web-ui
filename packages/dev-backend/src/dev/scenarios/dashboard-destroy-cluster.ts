import {app} from "dev/app";
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

let removeAttempts = 1;
app.removeCluster((_req, res) => {
  if (removeAttempts++ % 3 !== 0) {
    // only every 3rd attempt is successfull
    res
      .status(400)
      .send(
        [
          "Configuration conflict detected.",
          "Some nodes had a newer configuration than the local node."
            + " Local node's configuration was updated."
            + "  Please repeat the last action if appropriate.",
        ].join("\n\n"),
      );
    return;
  }

  res.send("");
});

shortcut.dashboard([
  response.buildClusterStatus.ok("ok"),
  response.buildClusterStatus.ok("error"),
]);
