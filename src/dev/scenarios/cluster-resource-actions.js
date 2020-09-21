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

const resourceManage = endpoints.resourceManage((req, res) => {
  lib.standardResponses({
    code: req.body.resource_or_tag_ids[0],
    res,
  });
});

const resourceDisable = endpoints.resourceDisable((req, res) => {
  lib.standardResponses({
    code: req.body.resource_or_tag_ids[0],
    res,
  });
});

export const base = [
  ...clusterScenario({ actions: responses.clusterStatus.actions }),
  resourceUnmanage,
  resourceDisable,
];

export const alternative = [
  ...clusterScenario({ actions: responses.clusterStatus.actionsAlternative }),
  resourceManage,
  resourceDisable,
];
