import * as endpoints from "dev/api/endpoints";
import * as responses from "dev/api/responses/all";

import * as lib from "./common/lib";
import { clusterScenario } from "./common/scenarios";

const resourceCreate = endpoints.resourceCreate((req, res) => {
  lib.standardResponses({
    code: req.body.resource_id,
    res,
    errors: {
      exist: [
        {
          severity: { level: "ERROR", force_code: null },
          message: {
            code: "ID_ALREADY_EXISTS",
            message: "'exist' already exists",
            payload: { id: "exist" },
          },
          context: null,
        },
      ],
    },
  });
});

export const all = [
  ...clusterScenario({ resourceTree: responses.clusterStatus.resourceTree }),
  resourceCreate,
];
