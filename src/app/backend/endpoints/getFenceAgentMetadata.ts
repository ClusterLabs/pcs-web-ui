import * as t from "io-ts";

import { endpoint } from "./endpoint";

export const getFenceAgentMetadata = endpoint({
  url: ({ clusterName }: { clusterName: string }) =>
    `/managec/${clusterName}/get_fence_agent_metadata`,
  method: "get",
  params: undefined,
  payload: undefined,
  shape: t.intersection([
    t.type({
      name: t.string,
      shortdesc: t.string,
      longdesc: t.string,
      parameters: t.array(
        t.type({
          name: t.string,
          type: t.string,
          shortdesc: t.string,
          unique: t.boolean,
          longdesc: t.string,
          default: t.union([t.null, t.string, t.number]),
          required: t.boolean,
          advanced: t.boolean,
          deprecated: t.boolean,
          deprecated_by: t.array(t.string),
          obsoletes: t.union([t.string, t.null]),
          pcs_deprecated_warning: t.string,
        }),
      ),
    }),
    t.partial({
      actions: t.array(
        t.intersection([
          t.type({ name: t.string }),
          t.partial({
            automatic: t.string,
            timeout: t.string,
          }),
        ]),
      ),
      default_actions: t.array(
        t.intersection([
          t.type({ name: t.string }),
          t.partial({ interval: t.string }),
        ]),
      ),
    }),
  ]),
});
