/* eslint-disable camelcase */
import * as t from "io-ts";
import { isRight } from "fp-ts/lib/Either";
import { PathReporter } from "io-ts/lib/PathReporter";

import * as api from "app/common/api";
import { ApiCallResult, createResult } from "./result";
import { dealWithNoAuth } from "./dealWithNoAuth";

/*
TODO obsoletes
*/
const TApiAgentParameter = t.type({
  name: t.string,
  shortdesc: t.string,
  longdesc: t.string,
  default: t.union([t.null, t.string, t.number]),
  required: t.boolean,
  advanced: t.boolean,
  deprecated: t.boolean,
  deprecated_by: t.array(t.string),
  obsoletes: t.null,
  pcs_deprecated_warning: t.string,
});

const TAgentMetadata = t.type({
  name: t.string,
  parameters: t.array(TApiAgentParameter),
});

const validate = (requestedAgentName: string, response: any) => {
  const result = TAgentMetadata.decode(response);
  if (!isRight(result)) {
    return PathReporter.report(result);
  }

  const agentMetadata: Result = response;
  if (agentMetadata.name !== requestedAgentName) {
    return [
      `Expected agent ${requestedAgentName} but got ${agentMetadata.name}`,
    ];
  }
  return [];
};

export type Result = t.TypeOf<typeof TAgentMetadata>;

export const call = dealWithNoAuth(async (
  clusterUrlName:string,
  agentName:string,
): Promise<ApiCallResult<Result>> => {
  const raw = await api.call.getJson(
    `/managec/${clusterUrlName}/get_resource_agent_metadata`,
    [["agent", agentName]],
  );
  return createResult<Result>(raw, validate(agentName, raw));
});
