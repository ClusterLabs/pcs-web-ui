import type {addConstraintRemote, addConstraintRuleRemote} from "app/backend";

type Constraint = Parameters<typeof addConstraintRemote>[0]["constraint"];

export type SingleCreateActions = {
  "CONSTRAINT.SINGLE.CREATE": {
    type: "CONSTRAINT.SINGLE.CREATE";
    key: {clusterName: string; task: string};
    payload:
      | {constraint: Exclude<Constraint, {location: unknown}>}
      | {
          locationSpecification: "node";
          constraint: Extract<Constraint, {location: unknown}>;
        }
      | {
          locationSpecification: "rule";
          constraint: Parameters<
            typeof addConstraintRuleRemote
          >[0]["constraint"];
        };
  };

  "CONSTRAINT.SINGLE.CREATE.OK": {
    type: "CONSTRAINT.SINGLE.CREATE.OK";
    key: {clusterName: string; task: string};
  };

  "CONSTRAINT.SINGLE.CREATE.FAIL": {
    type: "CONSTRAINT.SINGLE.CREATE.FAIL";
    key: {clusterName: string; task: string};
    payload: {message: string};
  };

  "CONSTRAINT.SINGLE.CREATE.FAIL.RECOVER": {
    type: "CONSTRAINT.SINGLE.CREATE.FAIL.RECOVER";
    key: {clusterName: string; task: string};
  };
};
