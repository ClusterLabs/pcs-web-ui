import * as endpoints from "dev/api/endpoints";
import * as responses from "dev/api/responses/all";

import * as lib from "./common/lib";
import { clusterScenario } from "./common/scenarios";

const resourceUnmanage = endpoints.resourceUnmanage((req, res) => {
  lib.standardResponses({
    code: req.body.resource_or_tag_ids[0],
    res,
  });
});

export const all = [
  ...clusterScenario({ resourceTree: responses.clusterStatus.resourceTree }),
  resourceUnmanage,
];
