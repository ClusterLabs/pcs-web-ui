import * as t from "io-ts";

import { endpoint } from "./endpoint";

const optionalString = t.union([t.string, t.null]);
const agentActions = t.array(
  t.intersection([
    t.type({ name: t.string }),
    t.partial({
      interval: optionalString,
      timeout: optionalString,
      role: optionalString,
      start_delay: optionalString,
      depth: optionalString,
      automatic: optionalString,
      on_target: optionalString,
      OCF_CHECK_LEVEL: optionalString,
    }),
  ]),
);

export const getResourceAgentMetadata = endpoint({
  url: ({ clusterName }: { clusterName: string }) =>
    `/managec/${clusterName}/get_resource_agent_metadata`,

  method: "get",

  params: undefined,
  payload: undefined,

  shape: t.intersection([
    // TODO obsoletes
    t.type({
      name: t.string,
      shortdesc: t.string,
      longdesc: t.string,
      parameters: t.array(
        t.intersection([
          t.type({
            name: t.string,
            type: t.string,
            shortdesc: t.string,
            longdesc: t.string,
            default: t.union([t.null, t.string, t.number]),
            required: t.boolean,
            advanced: t.boolean,
            deprecated: t.boolean,
            deprecated_by: t.array(t.string),
            obsoletes: optionalString,
            pcs_deprecated_warning: optionalString,
          }),
          t.partial({
            unique: t.boolean,
          }),
        ]),
      ),
    }),
    t.partial({
      actions: agentActions,
      default_actions: agentActions,
    }),
  ]),
});
