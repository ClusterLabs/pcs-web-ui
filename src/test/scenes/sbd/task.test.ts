import { intercept, location, route, shortcuts } from "test/tools";
import { dt, mkXPath } from "test/tools/selectors";

const clusterName = "sbd";

const VIEW = dt("task-sbd-configure");
const TASK = {
  VIEW,
  NEXT: dt(VIEW, "task-next"),
  WATCHDOGS: dt(VIEW, "form-watchdogs", "watchdog-0"),
  SUCCESS: dt(VIEW, "task-success"),
};

const launchTaskDisable = async () => {
  await page.goto(location.sbdList({ clusterName }));
  await page.click(dt("task-launch disable-sbd"));
  await page.waitForSelector("task-sbd-disable");
  expect(page.url()).toEqual(
    `${location.sbdList({ clusterName })}?task=sbdDisable`,
  );
};

const launchTaskConfigure = async () => {
  await page.goto(location.sbdList({ clusterName }));
  await page.click(dt("task-launch configure-sbd"));
  await page.waitForSelector(VIEW);
  expect(page.url()).toEqual(
    `${location.sbdList({ clusterName })}?task=sbdConfigure`,
  );
};

describe("Sbd", () => {
  afterEach(intercept.stop);

  it("should be disabled", async () => {
    shortcuts.interceptWithCluster({
      clusterName,
      additionalRouteList: [route.sbdDisable(clusterName)],
    });

    launchTaskDisable();
    await page.click(mkXPath("task-next"));
    await page.waitForSelector(dt(dt("task-sbd-disable"), "task-success"));
  });

  it("should be configured", async () => {
    shortcuts.interceptWithCluster({
      clusterName,
      additionalRouteList: [route.sbdConfigure(clusterName)],
    });

    launchTaskConfigure();
    await page.type(TASK.WATCHDOGS, "/dev/watchdog-test");
    await page.click(TASK.NEXT); // go to options
    await page.click(TASK.NEXT); // go to review
    await page.click(TASK.NEXT); // go to finish
    await page.waitForSelector(TASK.SUCCESS);
  });
});
