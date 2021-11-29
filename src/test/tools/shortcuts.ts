import * as responses from "dev/responses";

import { intercept, route } from "test/tools";

export const interceptWithCluster = ({
  clusterName,
  additionalRouteList,
  replaceRoutes,
}: {
  clusterName: keyof typeof responses.clusterStatus;
  additionalRouteList?: intercept.Route[];
  replaceRoutes?: Partial<
    Record<
      | "clusterStatus"
      | "resourceAgent"
      | "stonithAgent"
      | "propertiesDefinition"
      | "permissions",
      Parameters<typeof intercept.run>[0][number]
    >
  >;
}) => {
  const routeMap: typeof replaceRoutes = {
    clusterStatus: route.clusterStatus({
      clusterStatus: responses.clusterStatus[clusterName],
    }),
    resourceAgent: route.resourceAgentListAgents(clusterName),
    stonithAgent: route.stonithAgentListAgents({ clusterName }),
    propertiesDefinition: route.getClusterPropertiesDefinition({ clusterName }),
    permissions: route.getPermissions({ clusterName }),
  };

  return intercept.run([
    ...Object.values({ ...routeMap, ...(replaceRoutes || {}) }),
    ...(additionalRouteList || []),
  ]);
};
