import * as endpoints from "dev/api/endpoints";
import * as responses from "dev/api/responses/all";

import * as lib from "./common/lib";
import { clusterScenario } from "./common/scenarios";

const nodeStandbyUnstandby = endpoints.nodeStandbyUnstandby((req, res) => {
  lib.standardResponses({
    code: req.body.node_names[0],
    res,
  });
});

const nodeMaintenanceUnmaintenance = endpoints.nodeMaintenanceUnmaintenance(
  (req, res) => {
    lib.standardResponses({
      code: req.body.node_names[0],
      res,
    });
  },
);

const clusterStart = endpoints.clusterStart((req, res) => {
  if (req.body.name === "fail") {
    res.status(500).send("Something wrong");
    return;
  }
  if (req.body.name === "permission") {
    res.status(403).send("Permission denied");
    return;
  }

  if (req.body.name === "error") {
    res.status(400).send("Unable to start node.");
    return;
  }

  res.send("Some output");
});

const clusterStop = endpoints.clusterStop((req, res) => {
  if (req.body.name === "fail") {
    res.status(500).send("Something wrong");
    return;
  }
  if (req.body.name === "permission") {
    res.status(403).send("Permission denied");
    return;
  }

  if (req.body.name === "error") {
    res.status(400).send("Unable to stop node.");
    return;
  }

  res.send("Some output");
});

export const base = [
  ...clusterScenario({ actions: responses.clusterStatus.actions }),
  nodeStandbyUnstandby,
  nodeMaintenanceUnmaintenance,
  clusterStart,
  clusterStop,
];

export const alternative = [
  ...clusterScenario({ actions: responses.clusterStatus.actionsAlternative }),
  nodeStandbyUnstandby,
  nodeMaintenanceUnmaintenance,
  clusterStart,
  clusterStop,
];
