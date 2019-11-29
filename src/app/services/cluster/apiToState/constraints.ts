import {
  ApiClusterStatus,
  ApiLocation,
  ApiColocation,
  ApiLocationRule,
  ApiResourceSet,
} from "app/common/backend/types/clusterStatus";
import {
  Constraint,
  ResourceSet,
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
    type: "SCORE.ATTRIBUTE",
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
      type: "LOCATION.RULE.REFERENCE",
      id: apiLocation.id,
      referencedRuleId: apiLocation["id-ref"],
      resourceRelation: apiLocationToResourceRelation(apiLocation),
    };
  }
  return {
    type: "LOCATION.RULE",
    resourceRelation: apiLocationToResourceRelation(apiLocation),
    id: apiLocation.id,
    ruleString: apiLocation.rule_string,
    ruleScore: apiLocationToRuleScore(apiLocation),
  };
};

const apiToResourceSet = (apiSet: ApiResourceSet): ResourceSet => {
  if ("id-ref" in apiSet) {
    return { referenceId: apiSet["id-ref"] };
  }
  return {
    id: apiSet.id,
    sequential: apiSet.sequential,
    requireAll: apiSet["require-all"],
    ordering: apiSet.ordering,
    action: apiSet.action,
    role: apiSet.role,
    score: apiSet.score,
    resourceIdList: apiSet.resources,
  };
};

const apiToColocation = (apiColocation: ApiColocation): Constraint => {
  if ("sets" in apiColocation) {
    return {
      type: "COLOCATION.SET",
      id: apiColocation.id,
      score: apiColocation.score,
      sets: apiColocation.sets.map(apiToResourceSet),
    };
  }

  return {
    type: "COLOCATION",
    id: apiColocation.id,
    firstResource: {
      id: apiColocation.rsc,
      instance: apiColocation["rsc-instance"],
      role: apiColocation["rsc-role"],
    },
    secondResource: {
      id: apiColocation["with-rsc"],
      instance: apiColocation["with-rsc-instance"],
      role: apiColocation["with-rsc-role"],
    },
    score: apiColocation.score,
    nodeAttribute: apiColocation["node-attribute"],
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
    ...(apiConstraints.rsc_colocation || []).map(apiToColocation),
  ];
};
