import {endpoints} from "app/backend/endpoints";

import * as responses from "dev/responses";

export const stonithAgentListAgents = ({
  clusterName,
}: {
  clusterName: string;
}) => ({
  url: endpoints.libClusterStonithAgentListAgents.url({clusterName}),
  payload: endpoints.libClusterResourceAgentListAgents.payload,
  json: responses.lib.success({
    data: responses.stonithAgentListWithoutDescribe.ok,
  }),
});
