import { ActionPayload } from "app/store/actions";

import { Cluster } from "../types";

import { issuesToSummarySeverity, transformIssues } from "./issues";
import { processApiNodes } from "./nodes";
import { analyzeApiResources } from "./resources";

type ApiCluster = ActionPayload["CLUSTER.STATUS.FETCH.OK"];
const sbdDetection = (apiClusterState: ApiCluster) =>
  apiClusterState.node_list.reduce<Cluster["sbdDetection"]>(
    (sbd, node) =>
      node.status === "unknown"
        ? sbd
        : {
            enabled: (sbd !== null && sbd.enabled) || node.services.sbd.enabled,
          },
    null,
  );

export const apiToState = (apiClusterStatus: ApiCluster): Cluster => {
  const {
    resourceTree,
    resourcesSeverity,
    fenceDeviceList,
    fenceDevicesSeverity,
    resourceOnNodeStatusList,
  } = analyzeApiResources(apiClusterStatus.resource_list);
  const { nodeList, nodesSeverity } = processApiNodes(
    apiClusterStatus.node_list,
    apiClusterStatus.node_attr ?? {},
  );
  return {
    name: apiClusterStatus.cluster_name,
    nodeList,
    issueList: transformIssues(apiClusterStatus),
    resourceTree,
    fenceDeviceList,
    constraints: apiClusterStatus.constraints,
    resourceOnNodeStatusList,
    summary: {
      resourcesSeverity,
      fenceDevicesSeverity,
      nodesSeverity,
      issuesSeverity: issuesToSummarySeverity(
        apiClusterStatus.error_list,
        apiClusterStatus.warning_list,
      ),
    },
    nodeAttr: apiClusterStatus.node_attr ?? {},
    nodesUtilization: apiClusterStatus.nodes_utilization ?? {},
    sbdDetection: sbdDetection(apiClusterStatus),
  };
};
