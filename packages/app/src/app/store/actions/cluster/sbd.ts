import type {api} from "app/backend";

type SbdEnablePayload = api.Lib.ClusterCallPayload<"sbd-enable-sbd">;

type SbdOption<OPTION extends keyof SbdEnablePayload["sbd_options"]> = Exclude<
  SbdEnablePayload["sbd_options"][OPTION],
  undefined
>;

type SbdTimeoutAction<ACTIONS extends SbdOption<"SBD_TIMEOUT_ACTION">> =
  Extract<SbdOption<"SBD_TIMEOUT_ACTION">, ACTIONS>;

type SbdConfiguration = {
  watchdogDict: SbdEnablePayload["watchdog_dict"];
  delayStart: SbdOption<"SBD_DELAY_START"> | "DEFAULT";
  startmode: SbdOption<"SBD_STARTMODE"> | "DEFAULT";
  watchdogTimeout: SbdOption<"SBD_WATCHDOG_TIMEOUT">;
  timeoutActionFlush: SbdTimeoutAction<"flush" | "noflush"> | "DEFAULT";
  timeoutAction: SbdTimeoutAction<"reboot" | "off" | "crashdump"> | "DEFAULT";
};

export type ClusterSbdActions = {
  "CLUSTER.SBD.DISABLE.INIT": {
    type: "CLUSTER.SBD.DISABLE.INIT";
    payload: {
      clusterName: string;
    };
  };
  "CLUSTER.SBD.DISABLE.CLOSE": {
    type: "CLUSTER.SBD.DISABLE.CLOSE";
  };

  "CLUSTER.SBD.CONFIGURE": {
    type: "CLUSTER.SBD.CONFIGURE";
    payload: {clusterName: string} & SbdConfiguration;
  };

  "CLUSTER.SBD.CONFIGURE.UPDATE": {
    type: "CLUSTER.SBD.CONFIGURE.UPDATE";
    payload: Partial<SbdConfiguration>;
  };

  "CLUSTER.SBD.CONFIGURE.CLOSE": {
    type: "CLUSTER.SBD.CONFIGURE.CLOSE";
  };
};
