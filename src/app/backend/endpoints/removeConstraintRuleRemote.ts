import { endpoint } from "./endpoint";

export const removeConstraintRuleRemote = endpoint({
  url: ({ clusterName }: { clusterName: string }) =>
    `/managec/${clusterName}/remove_constraint_rule_remote`,
  method: "post",
  params: undefined,
  payload: undefined,
  validate: undefined,
  shape: undefined,
});
