import * as t from "dev/responses/clusterStatus/tools";
import * as shortcut from "dev/shortcuts";

shortcut.clusterStatus(
  t.cluster("meta-no-capable", "ok", {
    node_list: [t.node("1")],
    resource_list: [
      t.stonith("F1", {
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
);
shortcut.clusterRelated();
