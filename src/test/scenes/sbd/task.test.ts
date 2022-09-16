import * as t from "dev/responses/clusterStatus/tools";

import { intercept, location, route, shortcuts } from "test/tools";
import { dt, mkXPath } from "test/tools/selectors";

const sbdOptions: Parameters<typeof route.sbdConfigure>[0]["sbd_options"] = {
  SBD_DELAY_START: "no",
  SBD_STARTMODE: "always",
  SBD_TIMEOUT_ACTION: "flush,reboot",
  SBD_WATCHDOG_TIMEOUT: "5",
};
const clusterStatus = t.cluster("sbd", "ok", {
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
        pacemaker: { installed: true, running: false, enabled: true },
        pacemaker_remote: { installed: false, running: false, enabled: false },
        corosync: { installed: true, running: true, enabled: true },
        pcsd: { installed: true, running: true, enabled: false },
        sbd: { installed: false, running: false, enabled: false },
      },
    }),
  ],
});

const newWatchdogName = "/dev/watchdog-test";

const VIEW = dt("task-sbd-configure");
const TASK = {
  VIEW,
  NEXT: dt(VIEW, "task-next"),
  WATCHDOGS: (nodeName: string) =>
    dt(VIEW, "form-watchdogs", `watchdog-${nodeName}`),
  SUCCESS: dt(VIEW, "task-success"),
};

const goToSbd = async () => {
  await page.goto(
    location.sbdList({
      clusterName: clusterStatus.cluster_name,
    }),
  );
};

const launchTaskDisable = async () => {
  await goToSbd();
  await page.click(dt("task sbd-disable-SBD"));
  await page.waitForSelector(dt("task-sbd-disable"));
};

const launchTaskConfigure = async () => {
  await goToSbd();
  await page.click(dt("task sbd-configure-SBD"));
  await page.waitForSelector(VIEW);
};

describe("Sbd", () => {
  afterEach(intercept.stop);

  it("should be disabled", async () => {
    shortcuts.interceptWithCluster({
      clusterStatus,
      additionalRouteList: [route.sbdDisable(clusterStatus.cluster_name)],
    });

    await launchTaskDisable();
    await page.click(mkXPath("task-next"));
    await page.waitForSelector(dt("task-sbd-disable", "task-success"));
  });

  it("should be configured", async () => {
    shortcuts.interceptWithCluster({
      clusterStatus,
      additionalRouteList: [
        route.sbdConfigure({
          clusterName: clusterStatus.cluster_name,
          sbd_options: sbdOptions,
          watchdog_dict: { "node-1": newWatchdogName },
        }),
      ],
    });

    await launchTaskConfigure();
    await page.fill(TASK.WATCHDOGS("node-1"), newWatchdogName);
    await page.click(TASK.NEXT); // go to options
    await page.click(TASK.NEXT); // go to review
    await page.click(TASK.NEXT); // go to finish
    await page.waitForSelector(TASK.SUCCESS);
  });
});
