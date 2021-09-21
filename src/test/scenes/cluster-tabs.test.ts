import * as responses from "dev/responses";

import { dt } from "test/tools/selectors";
import { intercept, location, route, url } from "test/tools";

const currentTab = async () => {
  const currentTablist = await page.$$eval(dt("tabs cluster"), tabs =>
    tabs
      .map(e => e.querySelector(".pf-m-current")?.textContent ?? null)
      .filter(r => r !== null),
  );
  expect(currentTablist.length).toEqual(1);
  return currentTablist[0];
};

const checkClusterTab = async (
  clusterLocation: string,
  currentTabLabel: string,
  expectedAria: string,
) => {
  await page.goto(clusterLocation);
  await page.waitForSelector(dt(expectedAria));

  expect(await currentTab()).toEqual(currentTabLabel);
};

describe("Cluster scene", () => {
  beforeEach(
    intercept.start([
      {
        url: url.clusterStatus({ clusterName: "ok" }),
        json: responses.clusterStatus.ok,
      },
      route.getAvailResourceAgents("ok"),
      {
        url: url.clusterProperties({ clusterName: "ok" }),
        json: responses.clusterProperties.ok,
      },
    ]),
  );

  afterEach(intercept.stop);

  it("should show detail tab of cluster by default", async () => {
    await checkClusterTab(
      location.cluster({ clusterName: "ok" }),
      "Detail",
      "cluster-detail",
    );
  });

  it("should show nodes tab", async () => {
    await checkClusterTab(
      location.nodeList({ clusterName: "ok" }),
      "Nodes",
      "cluster-nodes",
    );
  });

  it("should show resources tab", async () => {
    await checkClusterTab(
      location.resourceList({ clusterName: "ok" }),
      "Resources",
      "cluster-resources",
    );
  });

  it("should show fence devices tab", async () => {
    await checkClusterTab(
      location.fenceDeviceList({ clusterName: "ok" }),
      "Fence Devices",
      "cluster-fence-devices",
    );
  });
});
