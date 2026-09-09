import {endpoints} from "app/backend/endpoints";

import * as responses from "dev/responses";

export const stonithAgentListAgents = (_props: {clusterName: string}) => ({
  url: endpoints.libClusterStonithAgentListAgents.url,
  payload: endpoints.libClusterResourceAgentListAgents.payload,
  json: responses.lib.success({
    data: responses.stonithAgentListWithoutDescribe.ok,
  }),
});
