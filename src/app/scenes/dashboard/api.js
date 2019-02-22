import * as CLUSTER from "app/services/cluster/status-constants";
import { mapConstants } from "app/utils";

const mapClusterStatus = mapConstants(CLUSTER.STATUS.UNKNOWN, {
  ok: CLUSTER.STATUS.OK,
  warning: CLUSTER.STATUS.WARNING,
  error: CLUSTER.STATUS.ERROR,
  UNKNOWN: CLUSTER.STATUS.UNKNOWN,
});

const mapNodeQuorum = mapConstants(CLUSTER.NODE.QUORUM.UNKNOWN, {
  [true]: CLUSTER.NODE.QUORUM.YES,
  [false]: CLUSTER.NODE.QUORUM.NO,
});

const mapNodeStatus = mapConstants(CLUSTER.NODE.STATUS.UNKNOWN, {
  online: CLUSTER.NODE.STATUS.ONLINE,
  offline: CLUSTER.NODE.STATUS.OFFLINE,
});

const mapResourceStatus = mapConstants(CLUSTER.RESOURCE.STATUS.UNKNOWN, {
  running: CLUSTER.RESOURCE.STATUS.RUNNING,
  blocked: CLUSTER.RESOURCE.STATUS.BLOCKED,
});

/* eslint-disable import/prefer-default-export */
export const transformClustersOverview = apiData => ({
  clusterList: apiData.cluster_list.map(cluster => ({
    name: cluster.cluster_name,
    status: mapClusterStatus(cluster.status),
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
