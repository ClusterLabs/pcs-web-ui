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
    endpoints.getResourceAgentMetadata((req, res) => {
      res.json(responses.resourceAgentMetadata.ok);
    }),
  ],
};

const RESOURCE_TREE = dt("cluster-resources");

const displayResources = async () => {
  await page().goto(url("/cluster/ok/resources"));
  await page().waitFor(RESOURCE_TREE);
};

const inspectResources = async () =>
  page().$$eval(dt(RESOURCE_TREE, "^resource-tree-item "), resourceElements =>
    resourceElements.map(e => ({
      id: e.querySelector("[data-test='resource-tree-item-name']").textContent,
      type: e.querySelector("[data-test='resource-tree-item-type']")
        .textContent,
    })),
  );

const toggleExpansion = async (resourceId) => {
  await page().click(
    dt(
      RESOURCE_TREE,
      `resource-tree-item ${resourceId}`,
      "resource-tree-item-toggle",
    ),
  );
};

const selectResource = async (resourceId) => {
  await page().click(
    dt(
      RESOURCE_TREE,
      `resource-tree-item ${resourceId}`,
      "resource-tree-item-name",
    ),
  );
  await page().waitFor(dt(`resource-detail ${resourceId}`));
  await page().waitFor(
    dt(
      RESOURCE_TREE,
      `resource-tree-item ${resourceId}`,
      "resource-tree-item-selection",
    ),
  );
};

const RESOURCES_UNEXPANDED = [
  { id: "A", type: "apache" },
  { id: "GROUP-1", type: "Group" },
  { id: "Clone-1", type: "Clone" },
  { id: "Clone-2", type: "Clone" },
];

describe("Resource tree", () => {
  afterEach(async () => {
    await pollyManager().stop();
  });

  beforeEach(() => {
    pollyManager().reset(scenarios.cluster);
  });

  it("should show unexpanded resource tree", async () => {
    await displayResources();
    expect(await inspectResources()).to.be.eql(RESOURCES_UNEXPANDED);
  });

  it("should show expanded group", async () => {
    await displayResources();
    await toggleExpansion("GROUP-1");
    expect(await inspectResources()).to.be.eql([
      { id: "A", type: "apache" },
      { id: "GROUP-1", type: "Group" },
      { id: "B", type: "Dummy" },
      { id: "C", type: "Dummy" },
      { id: "Clone-1", type: "Clone" },
      { id: "Clone-2", type: "Clone" },
    ]);
    await toggleExpansion("GROUP-1");
    expect(await inspectResources()).to.be.eql(RESOURCES_UNEXPANDED);
  });

  it("should show expanded clone with group", async () => {
    await displayResources();
    await toggleExpansion("Clone-1");
    await toggleExpansion("GROUP-2");
    expect(await inspectResources()).to.be.eql([
      { id: "A", type: "apache" },
      { id: "GROUP-1", type: "Group" },
      { id: "Clone-1", type: "Clone" },
      { id: "GROUP-2", type: "Group" },
      { id: "D", type: "Dummy" },
      { id: "E", type: "Dummy" },
      { id: "Clone-2", type: "Clone" },
    ]);
    await toggleExpansion("GROUP-2");
    await toggleExpansion("Clone-1");
    expect(await inspectResources()).to.be.eql(RESOURCES_UNEXPANDED);
  });

  it("should show primitive resource detail", async () => {
    await displayResources();
    await selectResource("A");
  });

  it("should show group detail", async () => {
    await displayResources();
    await selectResource("GROUP-1");
  });

  it("should show clone detail", async () => {
    await displayResources();
    await selectResource("Clone-1");
  });
});
