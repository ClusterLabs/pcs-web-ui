import {
  ApiClusterStatus,
  ApiLocation,
} from "app/common/backend/types/clusterStatus";
import { Constraint, ResourceRelation } from "../types";

const apiLocationToResourceRelation = (
  apiLocation: ApiLocation,
): ResourceRelation => {
  if ("rsc-pattern" in apiLocation) {
    return {
      type: "PATTERN",
      value: apiLocation["rsc-pattern"],
    };
  }

  if (!apiLocation.rsc) {
    return {
      type: "UNKNOWN",
      value: null,
    };
  }

  return {
    type: "RESOURCE-ID",
    value: apiLocation.rsc,
  };
};

const apiToLocation = (apiLocation: ApiLocation): Constraint => {
  return "node" in apiLocation
    ? {
      type: "LOCATION",
      resourceRelation: apiLocationToResourceRelation(apiLocation),
      id: apiLocation.id,
      node: apiLocation.node,
      score: apiLocation.score,
    }
    : {
      type: "LOCATION-RULE",
      resourceRelation: apiLocationToResourceRelation(apiLocation),
      id: apiLocation.id,
      ruleString: apiLocation.rule_string,
    };
};

export type ResourceIdConstraintsMap = Record<string, Constraint[]>;

export const convertConstraints = (
  apiConstraints: ApiClusterStatus["constraints"],
) => {
  if (!apiConstraints) {
    return [];
  }
  return [
    ...(apiConstraints.rsc_location || []).map(apiToLocation),
  ];
};
