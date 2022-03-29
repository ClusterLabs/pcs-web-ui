import * as types from "dev/types";
import * as responses from "dev/responses";

import { intercept, route } from "test/tools";

export const interceptWithCluster = (
  props: {
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
  } & (
    | {
        clusterName: keyof typeof responses.clusterStatus;
      }
    | {
        clusterStatus: types.Cluster;
      }
  ),
) => {
  const { additionalRouteList, replaceRoutes } = props;

  const clusterStatus =
    "clusterStatus" in props
      ? props.clusterStatus
      : responses.clusterStatus[props.clusterName];

  const routeMap: typeof replaceRoutes = {
    clusterStatus: route.clusterStatus({ clusterStatus }),
    resourceAgent: route.resourceAgentListAgents(clusterStatus.cluster_name),
    stonithAgent: route.stonithAgentListAgents({
      clusterName: clusterStatus.cluster_name,
    }),
    propertiesDefinition: route.getClusterPropertiesDefinition({
      clusterName: clusterStatus.cluster_name,
    }),
    permissions: route.getPermissions({
      clusterName: clusterStatus.cluster_name,
    }),
  };

  return intercept.run([
    ...Object.values({ ...routeMap, ...(replaceRoutes || {}) }),
    ...(additionalRouteList || []),
  ]);
};
