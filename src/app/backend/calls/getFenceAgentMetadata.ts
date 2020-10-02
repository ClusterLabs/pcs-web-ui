import { api, http, t, validate } from "app/backend/tools";

// TODO obsoletes
const shape = t.type({
  name: t.string,
  shortdesc: t.string,
  longdesc: t.string,
  parameters: t.array(
    t.type({
      name: t.string,
      shortdesc: t.string,
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
});

export const getFenceAgentMetadata = async (
  clusterUrlName: string,
  agentName: string,
): api.CallResult<typeof shape> =>
  http.get(`/managec/${clusterUrlName}/get_fence_agent_metadata`, {
    params: [["agent", agentName]],
    validate: (payload) => {
      const errors = validate.shape(payload, shape);
      if (errors.length > 0) {
        return errors;
      }
      const agentMetadata: t.TypeOf<typeof shape> = payload;
      if (agentMetadata.name !== agentName) {
        return [`Expected agent ${agentName} but got ${agentMetadata.name}`];
      }
      return [];
    },
  });
