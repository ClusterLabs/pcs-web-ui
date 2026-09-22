import {app} from "dev/app";
import * as shortcut from "dev/shortcuts";

app.addMetaAttrRemote((req, res) => {
  if ("err" === req.body.key) {
    res.status(400).send("Error adding meta attribute");
    return;
  }
  res.send("Successfully added meta attribute");
});

shortcut.clusterRelated();
