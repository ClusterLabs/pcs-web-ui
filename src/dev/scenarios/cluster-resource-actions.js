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

const resourceEnable = endpoints.resourceEnable((req, res) => {
  lib.standardResponses({
    code: req.body.resource_or_tag_ids[0],
    res,
  });
});

const refreshCleanup = (req, res) => {
  if (req.body.resource === "fail") {
    res.status(500).send("Something wrong");
    return;
  }
  if (req.body.resource === "permission") {
    res.status(403).send("Permission denied");
    return;
  }
  if (req.body.resource === "error") {
    res.json({
      error: "true",
      stdout: "Standard output",
      stderror: "Standard error",
    });
    return;
  }
  res.json({ success: "true" });
};

const removeResource = endpoints.removeResource((req, res) => {
  if (req.body.resource === "fail") {
    res.status(500).send("Something wrong");
    return;
  }
  if (req.body.resource === "permission") {
    res.status(403).send("Permission denied");
  }
});

const resourceRefresh = endpoints.resourceRefresh(refreshCleanup);
const resourceCleanup = endpoints.resourceCleanup(refreshCleanup);

export const base = [
  ...clusterScenario({ actions: responses.clusterStatus.actions }),
  resourceUnmanage,
  resourceDisable,
  resourceRefresh,
  resourceCleanup,
  removeResource,
];

export const alternative = [
  ...clusterScenario({ actions: responses.clusterStatus.actionsAlternative }),
  resourceManage,
  resourceEnable,
  resourceCleanup,
  removeResource,
];
