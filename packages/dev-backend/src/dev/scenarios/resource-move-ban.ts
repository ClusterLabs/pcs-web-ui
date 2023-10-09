import {app} from "dev/app";
import * as shortcut from "dev/shortcuts";
import * as t from "dev/responses/clusterStatus/tools";

shortcut.dashboard([
  t.cluster("resource-move-ban", "ok", {
    resource_list: [
      t.primitive("A", {
        crm_status: [t.resourceStatus("C2-ok")],
      }),
      t.group("G1", [
        t.primitive("B", {
          crm_status: [t.resourceStatus("C2-ok")],
        }),
        t.primitive("C", {
          crm_status: [t.resourceStatus("C2-ok")],
        }),
      ]),
      t.clone("C1", t.primitive("D")),
      t.clone("C2", t.group("G2", [t.primitive("E"), t.primitive("F")])),
    ],
  }),
]);

app.libCluster("resource-move-autoclean", (req, res) => {
  shortcut.libStd({
    code: req.body.resource_id,
    res,
  });
});
