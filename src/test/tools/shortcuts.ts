import * as responses from "dev/responses";

import { url as backendUrl, intercept } from "test/tools";

export const interceptWithCluster = (
  clusterName: keyof typeof responses.clusterStatus,
  routeList: intercept.Route[] = [],
) =>
  intercept.run([
    {
      url: backendUrl.clusterStatus({ clusterName }),
      json: responses.clusterStatus[clusterName],
    },
    {
      url: backendUrl.getAvailResourceAgents({ clusterName }),
      json: responses.resourceAgentList.ok,
    },
    {
      url: backendUrl.clusterProperties({ clusterName }),
      json: responses.clusterProperties.ok,
    },
    ...routeList,
  ]);
