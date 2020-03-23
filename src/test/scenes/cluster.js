const { expect } = require("chai");

const { page } = require("test/store");
const { getPollyManager } = require("test/tools/pollyManager");
const { url } = require("test/tools/backendAddress");

const endpoints = require("dev/api/endpoints");
const responses = require("dev/api/responses/all");

const pollyManager = getPollyManager(() => page());

const scenarios = {
  cluster: [
    endpoints.clusterStatus((req, res) => {
      res.json(responses.clusterStatus.ok);
    }),
  ],
};

const currentTab = async () => {
  const currentTablist = await page().$$eval(
    "[aria-label='Cluster tabs']",
    (tabs) => tabs.map((e) => (e.querySelector(".pf-m-current").textContent)),
  );
  expect(currentTablist.length).to.be.eql(1);
  return currentTablist[0];
};

const checkClusterTab = async (clusterUrl, currentTabLabel, expectedAria) => {
  pollyManager().reset(scenarios.cluster);
  await page().goto(url(clusterUrl));
  await page().waitFor(`[aria-label="${expectedAria}"]`);

  expect(await currentTab()).to.be.eql(currentTabLabel);
};

describe("Cluster scene", () => {
  afterEach(async () => { await pollyManager().stop(); });

  it("should show detail tab of cluster by default", async () => {
    await checkClusterTab("/cluster/ok", "Detail", "Cluster detail");
  });

  it("should show nodes tab", async () => {
    await checkClusterTab("/cluster/ok/nodes", "Nodes", "Cluster node list");
  });

  it("should show resources tab", async () => {
    await checkClusterTab(
      "/cluster/ok/resources",
      "Resources",
      "Cluster resources",
    );
  });

  it("should show fence devices tab", async () => {
    await checkClusterTab(
      "/cluster/ok/fence-devices",
      "Fence Devices",
      "Cluster fence devices",
    );
  });
});
