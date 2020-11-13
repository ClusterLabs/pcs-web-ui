export type ClusterListActions = {
  "CLUSTER.LIST.FETCH.OK": {
    type: "CLUSTER.LIST.FETCH.OK";
    payload: {
      clusterNameList: string[];
    };
  };

  "CLUSTER.LIST.REFRESH": {
    type: "CLUSTER.LIST.REFRESH";
  };

  "CLUSTER.LIST.SYNC": {
    type: "CLUSTER.LIST.SYNC";
  };

  "CLUSTER.LIST.SYNC.STOP": {
    type: "CLUSTER.LIST.SYNC.STOP";
  };
};
