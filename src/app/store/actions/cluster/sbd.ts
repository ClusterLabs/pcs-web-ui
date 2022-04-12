import { Cluster } from "app/store/selectors/types";

type NodeName = string;
type SbdTimeoutAction = "reboot" | "off" | "crashdump";
type SbdTimeoutActionFlush = "flush" | "noflush";

export type ClusterSbdActions = {
  "CLUSTER.SBD.DISABLE.CLOSE": {
    type: "CLUSTER.SBD.DISABLE.CLOSE";
    key: { clusterName: string };
  };

  "CLUSTER.SBD.CONFIGURE": {
    type: "CLUSTER.SBD.CONFIGURE";
    key: { clusterName: string };
    payload: { cluster: Cluster };
  };

  "CLUSTER.SBD.CONFIGURE.UPDATE": {
    type: "CLUSTER.SBD.CONFIGURE.UPDATE";
    key: { clusterName: string };
    payload: {
      watchdogDict?: Record<NodeName, string>;
      delayStart?: "yes" | "no" | "DEFAULT";
      startmode?: "always" | "clean" | "DEFAULT";
      watchdogTimeout?: string;
      timeoutActionFlush?: "DEFAULT" | "flush" | "noflush";
      timeoutAction?: "DEFAULT" | "reboot" | "crashdump" | "off";
      timeoutActionResult?:
        | SbdTimeoutAction
        | SbdTimeoutActionFlush
        | "crashdump,flush"
        | "crashdump,noflush"
        | "off,flush"
        | "off,noflush"
        | "reboot,flush"
        | "reboot,noflush"
        | "flush,crashdump"
        | "flush,off"
        | "flush,reboot"
        | "noflush,crashdump"
        | "noflush,off"
        | "noflush,reboot";
    };
  };

  "CLUSTER.SBD.CONFIGURE.CLOSE": {
    type: "CLUSTER.SBD.CONFIGURE.CLOSE";
    key: { clusterName: string };
  };
};
