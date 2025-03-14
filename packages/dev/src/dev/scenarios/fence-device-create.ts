import {app} from "dev/app";
import * as shortcut from "dev/shortcuts";
import * as response from "dev/responses";

app.libCluster("stonith-create", (req, res) => {
  shortcut.libStd({
    code: req.body.stonith_id,
    res,
    errors: {
      exist: [
        {
          severity: {level: "ERROR", force_code: null},
          message: {
            code: "ID_ALREADY_EXISTS",
            message: "'exist' already exists",
            payload: {id: "exist"},
          },
          context: null,
        },
      ],
    },
  });
});

app.libCluster("stonith-create-in-group", (req, res) => {
  shortcut.libStd({
    code: req.body.stonith_id,
    res,
    errors: {
      exist: [
        {
          severity: {level: "ERROR", force_code: null},
          message: {
            code: "ID_ALREADY_EXISTS",
            message: "'exist' already exists",
            payload: {id: "exist"},
          },
          context: null,
        },
      ],
    },
  });
});

shortcut.dashboard([response.clusterStatus.resourceTree]);
