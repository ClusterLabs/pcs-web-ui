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
      res.json(responses.clusterStatus.resourcesForTest);
    }),
  ],
};

const RESOURCE_LIST_SELECTOR = (
  "[aria-label='Cluster resources'] [aria-label='Cluster resource list']"
);

describe("Resource tree", () => {
  afterEach(async () => { await pollyManager().stop(); });

  it("should show unexpanded resource tree", async () => {
    pollyManager().reset(scenarios.cluster);
    await page().goto(url("/cluster/ok/resources"));
    await page().waitFor(RESOURCE_LIST_SELECTOR);
    const topLevelResources = await page().$$eval(
      `${RESOURCE_LIST_SELECTOR} [aria-label^='Resource item ']`,
      (resourceElements) => resourceElements.map((e) => ({
        id: e.querySelector("[aria-label='Resource name']").textContent,
        type: e.querySelector("[aria-label='Resource type']").textContent,
      })),
    );
    expect(topLevelResources).to.be.eql([
      { id: "A", type: "apache" },
      { id: "GROUP-1", type: "Group" },
      { id: "Clone-1", type: "Clone" },
      { id: "Clone-2", type: "Clone" },
    ]);
  });

  it("should show expanded group", async () => {
    pollyManager().reset(scenarios.cluster);
    const GROUP_SELECTOR = (
      `${RESOURCE_LIST_SELECTOR} [aria-label='Resource item GROUP-1']`
    );
    await page().goto(url("/cluster/ok/resources"));
    await page().waitFor(GROUP_SELECTOR);
    await page().click(`${GROUP_SELECTOR} [aria-label='Resource toggle']`);

    const topLevelResources = await page().$$eval(
      `${RESOURCE_LIST_SELECTOR} [aria-label^='Resource item ']`,
      (resourceElements) => resourceElements.map((e) => ({
        id: e.querySelector("[aria-label='Resource name']").textContent,
        type: e.querySelector("[aria-label='Resource type']").textContent,
      })),
    );
    expect(topLevelResources).to.be.eql([
      { id: "A", type: "apache" },
      { id: "GROUP-1", type: "Group" },
      { id: "B", type: "Dummy" },
      { id: "C", type: "Dummy" },
      { id: "Clone-1", type: "Clone" },
      { id: "Clone-2", type: "Clone" },
    ]);
  });
});
