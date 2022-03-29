type NodeName = string;

export type ClusterSbdActions = {
  "CLUSTER.SBD.DISABLE.CLOSE": {
    type: "CLUSTER.SBD.DISABLE.CLOSE";
    key: { clusterName: string };
  };

  "CLUSTER.SBD.ENABLE.UPDATE": {
    type: "CLUSTER.SBD.ENABLE.UPDATE";
    key: { clusterName: string };
    payload: {
      watchdogDict?: Record<NodeName, string>;
      delayStart?: "yes" | "no" | "DEFAULT";
      startmode?: "always" | "clean" | "DEFAULT";
      watchdogTimeout?: string;
    };
  };

  "CLUSTER.SBD.ENABLE.CLOSE": {
    type: "CLUSTER.SBD.ENABLE.CLOSE";
    key: { clusterName: string };
  };

  "CLUSTER.SBD.ENABLE.UPDATE_WATCHDOGS": {
    type: "CLUSTER.SBD.ENABLE.UPDATE_WATCHDOGS";
    key: { clusterName: string };
    payload: {
      watchdogs: string;
    };
  };
};
