import * as responses from "dev/api/responses/all";
import { dt } from "test/tools/selectors";
import { intercept, url } from "test/tools";

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
  clusterUrl: string,
  currentTabLabel: string,
  expectedAria: string,
) => {
  await page.goto(url(clusterUrl));
  await page.waitForSelector(dt(expectedAria));

  expect(await currentTab()).toEqual(currentTabLabel);
};

describe("Cluster scene", () => {
  beforeEach(
    intercept.start([
      {
        url: "/managec/ok/cluster_status",
        json: responses.clusterStatus.ok,
      },
      {
        url: "/managec/ok/get_avail_resource_agents",
        json: responses.resourceAgentList.ok,
      },
      {
        url: "/managec/ok/cluster_properties",
        json: responses.clusterProperties.ok,
      },
    ]),
  );

  afterEach(intercept.stop);

  it("should show detail tab of cluster by default", async () => {
    await checkClusterTab("/cluster/ok", "Detail", "cluster-detail");
  });

  it("should show nodes tab", async () => {
    await checkClusterTab("/cluster/ok/nodes", "Nodes", "cluster-nodes");
  });

  it("should show resources tab", async () => {
    await checkClusterTab(
      "/cluster/ok/resources",
      "Resources",
      "cluster-resources",
    );
  });

  it("should show fence devices tab", async () => {
    await checkClusterTab(
      "/cluster/ok/fence-devices",
      "Fence Devices",
      "cluster-fence-devices",
    );
  });
});
