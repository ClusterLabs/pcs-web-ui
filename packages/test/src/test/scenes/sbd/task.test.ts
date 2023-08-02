import {intercept, location, route, shortcuts} from "test/tools";
import {dt} from "test/tools/selectors";

import {clusterStatus, sbdOptions} from "./common";

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

const launchTaskConfigure = async () => {
  await goToSbd();
  await page.click(dt("task sbd-configure-SBD"));
  await page.waitForSelector(VIEW);
};

describe("Sbd", () => {
  afterEach(intercept.stop);

  it("should be configured", async () => {
    shortcuts.interceptWithCluster({
      clusterStatus,
      additionalRouteList: [
        route.sbdConfigure({
          clusterName: clusterStatus.cluster_name,
          sbd_options: sbdOptions,
          watchdog_dict: {"node-1": newWatchdogName},
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
