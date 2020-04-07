const { expect } = require("chai");

const { page } = require("test/store");
const { getPollyManager } = require("test/tools/pollyManager");
const { url } = require("test/tools/backendAddress");
const { dt } = require("test/tools/selectors");

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

const RESOURCE_TREE = dt("cluster-resources");

describe("Resource tree", () => {
  afterEach(async () => {
    await pollyManager().stop();
  });

  it("should show unexpanded resource tree", async () => {
    pollyManager().reset(scenarios.cluster);
    await page().goto(url("/cluster/ok/resources"));
    await page().waitFor(RESOURCE_TREE);
    const topLevelResources = await page().$$eval(
      dt(RESOURCE_TREE, "^resource-tree-item "),
      resourceElements =>
        resourceElements.map(e => ({
          id: e.querySelector("[data-test='resource-tree-item-name']")
            .textContent,
          type: e.querySelector("[data-test='resource-tree-item-type']")
            .textContent,
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
    // prettier-ignore
    const GROUP = dt(RESOURCE_TREE, "^resource-tree-item GROUP-1");
    await page().goto(url("/cluster/ok/resources"));
    await page().waitFor(GROUP);
    await page().click(dt(GROUP, "resource-tree-item-toggle"));

    const topLevelResources = await page().$$eval(
      dt(RESOURCE_TREE, "^resource-tree-item "),
      resourceElements =>
        resourceElements.map(e => ({
          id: e.querySelector("[data-test='resource-tree-item-name']")
            .textContent,
          type: e.querySelector("[data-test='resource-tree-item-type']")
            .textContent,
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
