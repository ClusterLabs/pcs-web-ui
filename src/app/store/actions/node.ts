export type NodeActions = {
  StartNode: {
    type: "NODE.START";
    payload: {
      clusterUrlName: string;
      nodeName: string;
    };
  };
  StopNode: {
    type: "NODE.STOP";
    payload: {
      clusterUrlName: string;
      nodeName: string;
    };
  };
  StandbyNode: {
    type: "NODE.STANDBY";
    payload: {
      clusterUrlName: string;
      nodeName: string;
    };
  };
  MaintenanceNode: {
    type: "NODE.MAINTENANCE";
    payload: {
      clusterUrlName: string;
      nodeName: string;
    };
  };
};
