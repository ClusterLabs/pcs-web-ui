import {type CallResult, endpoints, http} from "./tools";

const {url} = endpoints.removeConstraintRuleRemote;

export const removeConstraintRuleRemote = async ({
  ruleId,
}: {
  ruleId: string;
}): CallResult => http.post(url, {params: [["rule_id", ruleId]]});
