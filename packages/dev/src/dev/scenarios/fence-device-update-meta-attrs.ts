import {app} from "dev/app";
import * as shortcut from "dev/shortcuts";
import {cluster, node, stonith} from "dev/responses/clusterStatus/tools";

app.addMetaAttrRemote((req, res) => {
  if ("err" === req.body.key) {
    res.status(400).send("Error adding meta attribute");
    return;
  }
  res.send("Successfully added meta attribute");
});

shortcut.dashboard([
  cluster("meta-capable", "ok", {
    node_list: [node("1")],
    resource_list: [
      stonith("F1", {
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
  cluster("meta-no-capable", "ok", {
    node_list: [node("1")],
    resource_list: [
      stonith("F1", {
        meta_attr: [
          {
            id: "meta_b",
            name: "attribute_b",
            value: "vaulue_of_b",
          },
        ],
      }),
    ],
    pcsd_capabilities: [],
  }),
]);
