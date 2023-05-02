import {endpoint} from "./endpoint";

export const addConstraintRuleRemote = endpoint({
  url: ({clusterName}: {clusterName: string}) =>
    `/managec/${clusterName}/add_constraint_rule_remote`,
  method: "post",
  params: undefined,
  payload: undefined,
  validate: undefined,
  shape: undefined,
});
