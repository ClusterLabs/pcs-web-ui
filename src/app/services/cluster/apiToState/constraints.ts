import {
  ApiClusterStatus,
  ApiLocation,
} from "app/common/backend/types/clusterStatus";
import { types } from "app/services/cluster";

const apiToLocation = (apiLocation: ApiLocation): types.Constraint => (
  "node" in apiLocation
    ? {
      type: "LOCATION",
      id: apiLocation.id,
      node: apiLocation.node,
      score: apiLocation.score,
    }
    : {
      type: "LOCATION",
      id: apiLocation.id,
      rule: apiLocation.rule_string,
    }
);

export type ResourceIdConstraintsMap = Record<string, types.Constraint[]>;

export const transformConstraints = (
  constraints: ApiClusterStatus["constraints"],
) => {
  const assigned: ResourceIdConstraintsMap = {};
  const unassigned: types.Constraint[] = [];

  if (!constraints) {
    return { assigned, unassigned };
  }

  if (constraints.rsc_location) {
    constraints.rsc_location.forEach((apiLocation) => {
      if ("rsc" in apiLocation && apiLocation.rsc) {
        assigned[apiLocation.rsc] = [
          ...(assigned[apiLocation.rsc] || []),
          apiToLocation(apiLocation),
        ];
      } else {
        unassigned.push(apiToLocation(apiLocation));
      }
    });
  }

  return { assigned, unassigned };
};
