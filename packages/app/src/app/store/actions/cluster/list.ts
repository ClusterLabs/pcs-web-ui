export type ClusterListActions = {
  "CLUSTER.LIST.FETCH.OK": {
    type: "CLUSTER.LIST.FETCH.OK";
    payload: {
      clusterNameList: string[];
    };
  };

  "CLUSTER.LIST.FETCH.FAIL": {
    type: "CLUSTER.LIST.FETCH.FAIL";
  };

  "CLUSTER.LIST.BACKEND_NOT_FOUND": {
    type: "CLUSTER.LIST.BACKEND_NOT_FOUND";
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
