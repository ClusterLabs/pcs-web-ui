import {type CallResult, endpoints, http} from "./tools";

const {url} = endpoints.removeConstraintRuleRemote;

export const removeConstraintRuleRemote = async ({
  clusterName,
  ruleId,
}: {
  clusterName: string;
  ruleId: string;
}): CallResult =>
  http.post(url({clusterName}), {params: [["rule_id", ruleId]]});
