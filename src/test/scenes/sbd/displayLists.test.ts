//import { sbd } from "dev/responses/clusterStatus";

import { intercept, location, shortcuts } from "test/tools";
import { mkXPath } from "test/tools/selectors";

const clusterName = "sbd";
const sbdConfigTestData = {
  SBD_DELAY_START: "no",
  SBD_STARTMODE: "always",
  SBD_TIMEOUT_ACTION: "flush,reboot",
  SBD_WATCHDOG_TIMEOUT: "5",
};

const structure = {
  row: (i: number, list: string, columnName: string) =>
    mkXPath(list, `${list}-${i}-${columnName}`),
};

const checkSbdRowValue = async (
  i: number,
  columnName: string,
  expectedValue: string,
  list: string,
) => {
  const [value] = await page.$$eval(structure.row(i, list, columnName), el =>
    el.map(e => (e as HTMLElement).innerText),
  );
  expect(value.trim()).toEqual(expectedValue);
};

describe("Sbd", () => {
  afterEach(intercept.stop);

  it("service status should be displayed", async () => {
    shortcuts.interceptWithCluster({
      clusterName,
      additionalRouteList: [],
    });
    await page.goto(location.sbdList({ clusterName }));

    await checkSbdRowValue(0, "node", "node-1", "sbd-service-list");
    await checkSbdRowValue(0, "installed", "Installed", "sbd-service-list");
    await checkSbdRowValue(0, "enabled", "Enabled", "sbd-service-list");
    await checkSbdRowValue(0, "running", "Running", "sbd-service-list");
  });

  it("watchdogs should be displayed", async () => {
    shortcuts.interceptWithCluster({
      clusterName,
      additionalRouteList: [],
    });
    await page.goto(location.sbdList({ clusterName }));

    await checkSbdRowValue(0, "node", "node-1", "sbd-watchdogs-list");
    await checkSbdRowValue(
      0,
      "watchdog",
      "/dev/watchdog",
      "sbd-watchdogs-list",
    );
  });

  it("configuration should be displayed", async () => {
    shortcuts.interceptWithCluster({
      clusterName,
      additionalRouteList: [],
    });
    await page.goto(location.sbdList({ clusterName }));

    Object.entries(sbdConfigTestData).map(async ([option, value], i) => {
      await checkSbdRowValue(i, "option", option, "sbd-configuration-list");
      await checkSbdRowValue(i, "value", value, "sbd-configuration-list");
    });
  });
});
