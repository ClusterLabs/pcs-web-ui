/* eslint-disable camelcase */
import * as t from "io-ts";
import { isRight } from "fp-ts/lib/Either";
import { PathReporter } from "io-ts/lib/PathReporter";

import * as auth from "app/services/auth/sagas";

import { ApiCallGeneratorResult, createResult } from "./result";

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

  const agentMetadata: ApiAgentMetadata = response;
  if (agentMetadata.name !== requestedAgentName) {
    return [
      `Expected agent ${requestedAgentName} but got ${agentMetadata.name}`,
    ];
  }
  return [];
};

export type ApiAgentMetadata = t.TypeOf<typeof TAgentMetadata>;

export function* getResourceAgentMetadata(
  clusterUrlName:string,
  agentName:string,
): ApiCallGeneratorResult<ApiAgentMetadata> {
  const raw = yield auth.getJson(
    `/managec/${clusterUrlName}/get_resource_agent_metadata`,
    [["agent", agentName]],
  );

  return createResult<ApiAgentMetadata>(raw, validate(agentName, raw));
}
