import * as t from "dev/responses/clusterStatus/tools";

import {route} from "test/tools";
import * as shortcuts from "test/shortcuts";

export const sbdOptions = {
  SBD_DELAY_START: "no",
  SBD_STARTMODE: "always",
  SBD_TIMEOUT_ACTION: "flush,reboot",
  SBD_WATCHDOG_TIMEOUT: "5",
} satisfies Parameters<typeof route.sbdConfigure>[0]["sbd_options"];

export const clusterStatus = t.cluster("sbd", "ok", {
  node_list: [
    t.node("1", {
      sbd_config: {
        ...sbdOptions,
        SBD_OPTS: "a83-1",
        SBD_PACEMAKER: "yes",
        SBD_WATCHDOG_DEV: "/dev/watchdog",
        SBD_DEVICE: "/dev/sdb@node1;/dev/sda",
      },
    }),
    t.node("2", {
      services: {
        pacemaker: {installed: true, running: false, enabled: true},
        pacemaker_remote: {installed: false, running: false, enabled: false},
        corosync: {installed: true, running: true, enabled: true},
        pcsd: {installed: true, running: true, enabled: false},
        sbd: {installed: false, running: false, enabled: false},
      },
    }),
  ],
});

export const goToSbd = async () => {
  await shortcuts.dashboard.goToCluster(
    clusterStatus.cluster_name,
    tabs => tabs.sbd,
  );
};

export const toolbar = shortcuts.toolbar(marks.cluster.sbdToolbar);
