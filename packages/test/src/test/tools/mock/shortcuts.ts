import * as types from "dev/types";
import * as responses from "dev/responses";

import {Route, run} from "./mock";
import * as route from "./routes";

export const withCluster = (
  props: {
    additionalRouteList?: Route[];
    replaceRoutes?: Partial<
      Record<
        | "clusterStatus"
        | "resourceAgent"
        | "stonithAgent"
        | "propertiesDefinition"
        | "permissions"
        | "importedClusterList",
        Parameters<typeof run>[0][number]
      >
    >;
    optionalRoutes?: ("agentDummy" | "agentFenceApc")[];
  } & (
    | {
        clusterName: keyof typeof responses.clusterStatus;
      }
    | {
        clusterStatus: types.Cluster;
      }
  ),
) => {
  const {additionalRouteList, replaceRoutes} = props;

  const clusterStatus =
    "clusterStatus" in props
      ? props.clusterStatus
      : responses.clusterStatus[props.clusterName];

  const routeMap: typeof replaceRoutes = {
    clusterStatus: route.clusterStatus({clusterStatus}),
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
    importedClusterList: route.importedClusterList({
      clusterStatusList: [clusterStatus],
    }),
  };

  const optionalRouteMap: Partial<
    Record<
      NonNullable<typeof props.optionalRoutes>[number],
      Parameters<typeof run>[0][number]
    >
  > = {
    agentDummy: route.resourceAgentDescribeAgent({
      clusterName: clusterStatus.cluster_name,
      agentName: "ocf:heartbeat:Dummy",
      agentData: responses.resourceAgentMetadata.ocfHeartbeatDummy,
    }),
    agentFenceApc: route.stonithAgentDescribeAgent({
      clusterName: clusterStatus.cluster_name,
      agentName: "fence_apc",
      agentData: responses.fenceAgentMetadata.ok,
    }),
  };

  return run([
    ...Object.values({...routeMap, ...(replaceRoutes || {})}),
    ...(additionalRouteList || []),
    ...Object.values({...optionalRouteMap}),
  ]);
};

export const withDashboard = (props: {
  clusterStatus: types.Cluster | types.Cluster[];
  routeList?: Route[];
}) => {
  const clusterStatusList = Array.isArray(props.clusterStatus)
    ? props.clusterStatus
    : [props.clusterStatus];
  run([
    route.importedClusterList({clusterStatusList}),
    ...clusterStatusList.map(s => route.clusterStatus({clusterStatus: s})),
    ...(props.routeList || []),
  ]);
};
