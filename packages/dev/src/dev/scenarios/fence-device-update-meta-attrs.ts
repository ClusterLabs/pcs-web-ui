import {app} from "dev/app";
import * as t from "dev/responses/clusterStatus/tools";
import * as shortcut from "dev/shortcuts";

app.addMetaAttrRemote((req, res) => {
  if ("err" === req.body.key) {
    res.status(400).send("Error adding meta attribute");
    return;
  }
  res.send("Successfully added meta attribute");
});

shortcut.clusterStatus(
  t.cluster("meta-capable", "ok", {
    node_list: [t.node("1")],
    resource_list: [
      t.stonith("F1", {
        meta_attr: [
          {
            id: "meta_a",
            name: "attribute_a",
            value: "vaulue_of_a",
          },
        ],
      }),
    ],
    pcsd_capabilities: ["pcmk.resource.update-meta.stonith"],
  }),
);
shortcut.clusterRelated();
