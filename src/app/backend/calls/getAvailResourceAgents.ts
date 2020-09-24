import { api, http, t } from "app/backend/tools";

const shape = t.record(
  t.string,
  t.type({
    full_name: t.string,
    class_provider: t.string,
    class: t.string,
    provider: t.union([t.string, t.null]),
    type: t.string,
  }),
);

export const getAvailResourceAgents: api.CallShape<typeof shape> = async (
  clusterUrlName: string,
) =>
  http.get(`/managec/${clusterUrlName}/get_avail_resource_agents`, {
    shape,
  });
