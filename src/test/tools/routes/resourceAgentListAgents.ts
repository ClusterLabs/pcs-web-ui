import { endpoints } from "app/backend/endpoints";

import * as responses from "dev/responses";

export const resourceAgentListAgents = (clusterName: string) => ({
  url: endpoints.libClusterResourceAgentListAgents.url({ clusterName }),
  payload: endpoints.libClusterResourceAgentListAgents.payload,
  json: responses.lib.success({
    data: responses.resourceAgentListWithoutDescribe.ok,
  }),
});
