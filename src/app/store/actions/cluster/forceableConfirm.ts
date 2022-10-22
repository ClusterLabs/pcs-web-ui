export type ClusterForceableConfirmActions = {
  "CLUSTER.FORCEABLE-CONFIRM": {
    type: "CLUSTER.FORCEABLE-CONFIRM";
    key: { clusterName: string };
  };

  "CLUSTER.FORCEABLE-CONFIRM.OK": {
    type: "CLUSTER.FORCEABLE-CONFIRM.OK";
    key: { clusterName: string };
  };

  "CLUSTER.FORCEABLE-CONFIRM.FAIL": {
    type: "CLUSTER.FORCEABLE-CONFIRM.FAIL";
    key: { clusterName: string };
    payload: {
      message: string;
    };
  };

  "CLUSTER.FORCEABLE-CONFIRM.CLOSE": {
    type: "CLUSTER.FORCEABLE-CONFIRM.CLOSE";
    key: { clusterName: string };
  };
};
