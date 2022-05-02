import { intercept, location, shortcuts } from "test/tools";
import { mkXPath } from "test/tools/selectors";

const clusterName = "sbd";
const sbdConfigTestData = {
  SBD_DELAY_START: "no",
  SBD_STARTMODE: "always",
  SBD_TIMEOUT_ACTION: "flush,reboot",
  SBD_WATCHDOG_TIMEOUT: "5",
};

const getListValueMiner =
  (listName: string) => (rowKey: string) => async (columnName: string) => {
    const [value] = await page.$$eval(
      mkXPath(listName, `row-${rowKey}`, columnName),
      el => el.map(e => (e as HTMLElement).innerText),
    );
    return value.trim();
  };

describe("Sbd", () => {
  afterEach(intercept.stop);

  it("service status should be displayed", async () => {
    shortcuts.interceptWithCluster({
      clusterName,
      additionalRouteList: [],
    });
    await page.goto(location.sbdList({ clusterName }));

    const getColumnValue = getListValueMiner("sbd-service-list")("node-1");
    expect(await getColumnValue("node")).toEqual("node-1");
    expect(await getColumnValue("installed")).toEqual("Installed");
    expect(await getColumnValue("enabled")).toEqual("Enabled");
    expect(await getColumnValue("running")).toEqual("Running");
  });

  it("watchdogs should be displayed", async () => {
    shortcuts.interceptWithCluster({
      clusterName,
      additionalRouteList: [],
    });
    await page.goto(location.sbdList({ clusterName }));

    const getColumnValue = getListValueMiner("sbd-watchdog-list")("node-1");
    expect(await getColumnValue("node")).toEqual("node-1");
    expect(await getColumnValue("watchdog")).toEqual("/dev/watchdog");
  });

  it("configuration should be displayed", async () => {
    shortcuts.interceptWithCluster({
      clusterName,
      additionalRouteList: [],
    });
    await page.goto(location.sbdList({ clusterName }));

    const getRowValueMiner = getListValueMiner("sbd-configuration-list");
    await Promise.all(
      Object.entries(sbdConfigTestData).map(async ([option, value]) => {
        expect(await getRowValueMiner(option)("value")).toEqual(value);
      }),
    );
  });
});
