import * as CLUSTER_STATUS from "app/services/cluster/status-constants";
import { mapConstants } from "app/utils";

const mapNodeQuorum = mapConstants(CLUSTER_STATUS.NODE.QUORUM.UNKNOWN, {
  [true]: CLUSTER_STATUS.NODE.QUORUM.YES,
  [false]: CLUSTER_STATUS.NODE.QUORUM.NO,
});

const mapNodeStatus = mapConstants(CLUSTER_STATUS.NODE.STATUS.UNKNOWN, {
  online: CLUSTER_STATUS.NODE.STATUS.ONLINE,
  offline: CLUSTER_STATUS.NODE.STATUS.OFFLINE,
});

const mapResourceStatus = mapConstants(CLUSTER_STATUS.RESOURCE.STATUS.UNKNOWN, {
  running: CLUSTER_STATUS.RESOURCE.STATUS.RUNNING,
  blocked: CLUSTER_STATUS.RESOURCE.STATUS.BLOCKED,
});

/* eslint-disable import/prefer-default-export */
export const transformClustersOverview = apiData => ({
  clusterList: apiData.cluster_list.map(cluster => ({
    name: cluster.cluster_name,
    status: cluster.status,
    nodeList: cluster.node_list.map(node => ({
      name: node.name,
      status: mapNodeStatus(node.status),
      quorum: mapNodeQuorum(node.quorum),
    })),
    warningList: cluster.warning_list.map(warning => warning.message),
    resourceList: cluster.resource_list
      .filter(resource => !resource.stonith)
      .map(resource => ({
        id: resource.id,
        status: mapResourceStatus(resource.status),
      }))
    ,
    stonithList: cluster.resource_list
      .filter(stonith => stonith.stonith)
      .map(stonith => ({
        id: stonith.id,
        status: mapResourceStatus(stonith.status),
      }))
    ,
  })),
});
