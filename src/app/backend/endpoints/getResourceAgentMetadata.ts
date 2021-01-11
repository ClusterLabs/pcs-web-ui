import * as t from "io-ts";

import { endpoint } from "./endpoint";

export const getResourceAgentMetadata = endpoint({
  url: ({ clusterName }: { clusterName: string }) =>
    `/managec/${clusterName}/get_resource_agent_metadata`,

  method: "get",

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
            obsoletes: t.null,
            pcs_deprecated_warning: t.string,
          }),
          t.partial({
            unique: t.boolean,
          }),
        ]),
      ),
    }),
    t.partial({
      actions: t.array(
        t.intersection([
          t.type({ name: t.string }),
          t.partial({
            interval: t.string,
            timeout: t.string,
          }),
        ]),
      ),
      default_actions: t.array(
        t.intersection([
          t.type({ name: t.string }),
          t.partial({
            interval: t.string,
            timeout: t.string,
          }),
        ]),
      ),
    }),
  ]),
});
