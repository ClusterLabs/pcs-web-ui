import * as t from "dev/responses/clusterStatus/tools";
import * as shortcut from "dev/shortcuts";

shortcut.clusterStatus(
  t.cluster("simulated-resource-error", "ok", {
    resource_list: [
      t.primitive("A", {
        warning_list: [
          {
            message:
              "Failed to asyncmon C on Thu Sep 21 11:50:57 2023 on node r91-1.vm: Simulated failure",
          },
        ],
      }),
    ],
  }),
);
shortcut.clusterRelated();
