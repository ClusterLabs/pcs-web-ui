export type DashboardImportExistingClusterActions = {
  "DASHBOARD.CLUSTER.IMPORT.UPDATE_NODE": {
    type: "DASHBOARD.CLUSTER.IMPORT.UPDATE_NODE";
    payload: {
      nodeName: string;
    };
  };

  "DASHBOARD.CLUSTER.IMPORT.CHECK_AUTH": {
    type: "DASHBOARD.CLUSTER.IMPORT.CHECK_AUTH";
    payload: {
      nodeName: string;
    };
  };

  "DASHBOARD.CLUSTER.IMPORT.CHECK_AUTH.FAIL": {
    type: "DASHBOARD.CLUSTER.IMPORT.CHECK_AUTH.FAIL";
    payload: {
      message: string;
    };
  };

  "DASHBOARD.CLUSTER.IMPORT.CHECK_AUTH.NO_AUTH": {
    type: "DASHBOARD.CLUSTER.IMPORT.CHECK_AUTH.NO_AUTH";
    payload: {
      authProcessId: number;
    };
  };

  "DASHBOARD.CLUSTER.IMPORT.CHECK_AUTH.OK": {
    type: "DASHBOARD.CLUSTER.IMPORT.CHECK_AUTH.OK";
  };

  "DASHBOARD.CLUSTER.IMPORT.RUN": {
    type: "DASHBOARD.CLUSTER.IMPORT.RUN";
    payload: {
      nodeName: string;
    };
  };

  "DASHBOARD.CLUSTER.IMPORT.RUN.ERROR": {
    type: "DASHBOARD.CLUSTER.IMPORT.RUN.ERROR";
    payload: {
      message: string;
    };
  };

  "DASHBOARD.CLUSTER.IMPORT.RUN.OK": {
    type: "DASHBOARD.CLUSTER.IMPORT.RUN.OK";
  };

  "DASHBOARD.CLUSTER.IMPORT.CLOSE": {
    type: "DASHBOARD.CLUSTER.IMPORT.CLOSE";
  };
};
