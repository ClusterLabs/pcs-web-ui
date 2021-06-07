import { endpoint } from "./endpoint";

export const removeConstraintRuleRemote = endpoint({
  url: ({ clusterName }: { clusterName: string }) =>
    `/managec/${clusterName}/remove_constraint_rule_remote`,
  method: "post",
  shape: undefined,
});
