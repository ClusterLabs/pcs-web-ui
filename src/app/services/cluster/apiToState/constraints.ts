import {
  ApiClusterStatus,
  ApiLocation,
  ApiLocationRule,
} from "app/common/backend/types/clusterStatus";
import {
  Constraint,
  ResourceRelation,
  RuleScore,
} from "../types";

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

const apiLocationToRuleScore = (
  apiLocationRule: ApiLocationRule,
): RuleScore => {
  if ("score" in apiLocationRule) {
    return {
      type: "SCORE",
      value: apiLocationRule.score,
    };
  }
  return {
    type: "SCORE-ATTRIBUTE",
    value: apiLocationRule["score-attribute"],
  };
};

const apiToLocation = (apiLocation: ApiLocation): Constraint => {
  if ("node" in apiLocation) {
    return {
      type: "LOCATION",
      resourceRelation: apiLocationToResourceRelation(apiLocation),
      id: apiLocation.id,
      node: apiLocation.node,
      score: apiLocation.score,
    };
  }
  if ("id-ref" in apiLocation) {
    return {
      type: "LOCATION-RULE-REFERENCE",
      id: apiLocation.id,
      referencedRuleId: apiLocation["id-ref"],
      resourceRelation: apiLocationToResourceRelation(apiLocation),
    };
  }
  return {
    type: "LOCATION-RULE",
    resourceRelation: apiLocationToResourceRelation(apiLocation),
    id: apiLocation.id,
    ruleString: apiLocation.rule_string,
    ruleScore: apiLocationToRuleScore(apiLocation),
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
