import { app } from "dev/app";
import * as shortcut from "dev/shortcuts";

shortcut.checkAuthAgainstNodes({
  //nodeName: checkValue
  authNonsense: "nonsense",
  authUnable: "Unable to authenticate",
  authOffline: "Offline",
  //authErr: responds 500
  //any other: Online
});

shortcut.authGuiAgainstNodes();

app.existingCluster((req, res) => {
  const nodeName = req.body["node-name"];
  if (nodeName === "conflict") {
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
  } else {
    res.send("");
  }
});

shortcut.dashboard([]);
