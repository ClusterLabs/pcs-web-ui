import {endpoints} from "app/backend/endpoints";

import * as responses from "dev/responses";

export const resourceAgentListAgents = (_clusterName: string) => ({
  url: endpoints.libClusterResourceAgentListAgents.url,
  payload: endpoints.libClusterResourceAgentListAgents.payload,
  json: responses.lib.success({
    data: responses.resourceAgentListWithoutDescribe.ok,
  }),
});
