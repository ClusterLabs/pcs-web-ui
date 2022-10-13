export type DashboardClusterActions = {
  "DASHBOARD.CLUSTER.REMOVE": {
    type: "DASHBOARD.CLUSTER.REMOVE";
    payload: {
      clusterName: string;
    };
  };

  "DASHBOARD.CLUSTER.DESTROY": {
    type: "DASHBOARD.CLUSTER.DESTROY";
    payload: {
      clusterName: string;
    };
  };

  "DASHBOARD.CLUSTER.START": {
    type: "DASHBOARD.CLUSTER.START";
    payload: {
      clusterName: string;
    };
  };

  "DASHBOARD.CLUSTER.STOP": {
    type: "DASHBOARD.CLUSTER.STOP";
    payload: {
      clusterName: string;
    };
  };
};
