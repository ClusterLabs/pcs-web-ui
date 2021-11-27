import * as responses from "dev/responses";

import { url as backendUrl, intercept, route } from "test/tools";

export const interceptWithCluster = (
  clusterName: keyof typeof responses.clusterStatus,
  routeList: intercept.Route[] = [],
) =>
  intercept.run([
    {
      url: backendUrl.clusterStatus({ clusterName }),
      json: responses.clusterStatus[clusterName],
    },
    route.resourceAgentListAgents(clusterName),
    route.stonithAgentListAgents({ clusterName }),
    route.getClusterPropertiesDefinition({ clusterName }),
    route.getPermissions({ clusterName }),

    ...routeList,
  ]);
