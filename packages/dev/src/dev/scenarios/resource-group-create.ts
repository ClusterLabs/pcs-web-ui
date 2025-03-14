import {app} from "dev/app";
import * as shortcut from "dev/shortcuts";
import * as response from "dev/responses";

app.libCluster("resource-group-add", (req, res) => {
  shortcut.libStd({
    code: req.body.group_id,
    res,
    errors: {
      "id-not-found": [
        {
          severity: {level: "ERROR", force_code: null},
          message: {
            code: "ID_NOT_FOUND",
            message: "'id-not-found' does not exist",
            payload: {id: "id-not-found", expected_types: ["primitive"]},
          },
          context: null,
        },
      ],
    },
  });
});

shortcut.dashboard([response.clusterStatus.resourceTree]);
