import {
  ApiClusterStatus,
  ApiIssue,
  ApiNode,
  ApiResource,
  ApiStonith,
  ApiResourcePcmkPrimitive,
  ApiWithIssues,
} from "app/common/backend/clusterStatusTypes";

import { statusSeverity } from "app/common/utils";
import { StatusSeverity } from "app/common/types";

import {
  ClusterState,
  Issue,
  Node,
  Resource,
  FenceDevice,
} from "./types";

const mapClusterStatus = (
  status: ApiClusterStatus["status"],
): ClusterState["status"] => {
  switch (status) {
    case "ok": return "OK";
    case "warning": return "WARNING";
    case "error": return "ERROR";
    default: return "UNKNOWN";
  }
};

const mapIssue = (severity: Issue["severity"]) => (issue: ApiIssue) => ({
  severity,
  message: issue.message,
});

const transformIssues = (element: ApiWithIssues) => [
  ...element.error_list.map(mapIssue("ERROR")),
  ...element.warning_list.map(mapIssue("WARNING")),
];

// Nodes
const mapNodeStatus = (status: ApiNode["status"]): Node["status"] => {
  switch (status) {
    case "online": return "ONLINE";
    case "offline": return "OFFLINE";
    default: return "UNKNOWN";
  }
};

const nodeStatusToSeverity = (
  status: ApiNode["status"],
): Node["statusSeverity"] => {
  switch (status) {
    case "online": return "OK";
    case "offline": return "ERROR";
    default: return "UNKNOWN";
  }
};

const mapNodeQuorum = (quorum: ApiNode["quorum"]): Node["quorum"] => {
  switch (quorum) {
    case true: return "YES";
    case false: return "NO";
    default: return "UNKNOWN";
  }
};

const quorumToSeverity = (
  quorum: ApiNode["quorum"],
): Node["quorumSeverity"] => {
  switch (quorum) {
    case true: return "OK";
    case false: return "WARNING";
    default: return "UNKNOWN";
  }
};

const nodesToSummarySeverity = statusSeverity.itemsToSummarySeverity(
  (apiNode: ApiNode): Node["statusSeverity"] => {
    if (apiNode.status === "offline") {
      return "ERROR";
    }
    if (apiNode.quorum === false) {
      return "WARNING";
    }
    if (apiNode.status === "online" && apiNode.quorum === true) {
      return "OK";
    }
    return "UNKNOWN";
  },
);

// Resources
const mapPcmkResourceStatus = (
  status: ApiResource["status"],
): Resource["status"] |FenceDevice["status"] => {
  switch (status) {
    case "running": return "RUNNING";
    case "blocked": return "BLOCKED";
    case "failed": return "FAILED";
    default: return "UNKNOWN";
  }
};

const pcmkResouceToSeverity = (
  resource: ApiResourcePcmkPrimitive,
): StatusSeverity => {
  switch (resource.status) {
    case "blocked": return "ERROR";
    case "failed": return "ERROR";
    case "running": return "OK";
    default: return "UNKNOWN";
  }
};

const pcmkResourcesToSummarySeverity = statusSeverity.itemsToSummarySeverity(
  pcmkResouceToSeverity,
);

const issuesToSummarySeverity = (
  element: ApiWithIssues,
): ClusterState["summary"]["issusSeverity"] => {
  if (element.error_list.length > 0) {
    return "ERROR";
  }
  if (element.warning_list.length > 0) {
    return "WARNING";
  }
  return "OK";
};

const apiToState = (apiClusterStatus: ApiClusterStatus): ClusterState => {
  const resources = apiClusterStatus.resource_list.filter(
    (r): r is ApiResource => r.class_type === "primitive",
  );
  const fenceDevices = apiClusterStatus.resource_list.filter(
    (r): r is ApiStonith => r.class_type === "stonith",
  );
  return {
    name: apiClusterStatus.cluster_name,
    urlName: apiClusterStatus.cluster_name,
    status: mapClusterStatus(apiClusterStatus.status),
    nodeList: apiClusterStatus.node_list.map(apiNode => ({
      name: apiNode.name,
      status: mapNodeStatus(apiNode.status),
      statusSeverity: nodeStatusToSeverity(apiNode.status),
      quorum: mapNodeQuorum(apiNode.quorum),
      quorumSeverity: quorumToSeverity(apiNode.quorum),
      issueList: transformIssues(apiNode),
    })),
    issueList: transformIssues(apiClusterStatus),
    resourceList: resources.map(apiResource => ({
      id: apiResource.id,
      status: mapPcmkResourceStatus(apiResource.status),
      statusSeverity: pcmkResouceToSeverity(apiResource),
      issueList: transformIssues(apiResource),
    })),
    fenceDeviceList: fenceDevices.map(apiFenceDevice => ({
      id: apiFenceDevice.id,
      status: mapPcmkResourceStatus(apiFenceDevice.status),
      statusSeverity: pcmkResouceToSeverity(apiFenceDevice),
      issueList: transformIssues(apiFenceDevice),
    })),
    summary: {
      nodesSeverity: nodesToSummarySeverity(apiClusterStatus.node_list),
      resourcesSeverity: pcmkResourcesToSummarySeverity(resources),
      fenceDevicesSeverity: pcmkResourcesToSummarySeverity(fenceDevices),
      issusSeverity: issuesToSummarySeverity(apiClusterStatus),
    },
  };
};

export default apiToState;
