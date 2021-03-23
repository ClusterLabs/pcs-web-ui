import { CallResult, endpoints, http, t, validate } from "app/backend/tools";

const { url, shape } = endpoints.getResourceAgentMetadata;

export const getResourceAgentMetadata = async (
  clusterName: string,
  agentName: string,
): CallResult<typeof shape> =>
  http.get(url({ clusterName }), {
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
