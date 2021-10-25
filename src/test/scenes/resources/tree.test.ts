import * as responses from "dev/responses";

import { dt } from "test/tools/selectors";
import { intercept, location, route, url } from "test/tools";

const RESOURCE_TREE = dt("cluster-resources");

const displayResources = async () => {
  await page.goto(location.resourceList({ clusterName: "ok" }));
  await page.waitForSelector(RESOURCE_TREE);
};

const inspectResources = async () =>
  page.$$eval(dt(RESOURCE_TREE, "^resource-tree-item "), resourceElements =>
    resourceElements.map(e => ({
      id: e.querySelector("[data-test='resource-tree-item-name']")?.textContent,
      type: e.querySelector("[data-test='resource-tree-item-type']")
        ?.textContent,
    })),
  );

const toggleExpansion = async (resourceId: string) => {
  await page.click(
    dt(
      RESOURCE_TREE,
      `resource-tree-item ${resourceId}`,
      "resource-tree-item-toggle",
    ),
  );
};

const selectResource = async (resourceId: string) => {
  await page.click(
    dt(
      RESOURCE_TREE,
      `resource-tree-item ${resourceId}`,
      "resource-tree-item-name",
    ),
  );
  await page.waitForSelector(dt(`resource-detail ${resourceId}`));
  await page.waitForSelector(
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

const interceptWithCluster = (routeList: intercept.Route[]) =>
  intercept.start([
    {
      url: url.clusterStatus({ clusterName: "ok" }),
      json: responses.clusterStatus.resourcesForTest,
    },
    route.resourceAgentListAgents("ok"),
    route.stonithAgentListAgents({ clusterName: "ok" }),
    route.getClusterPropertiesDefinition({ clusterName: "ok" }),
    ...routeList,
  ]);

describe("Resource tree", () => {
  beforeEach(interceptWithCluster([]));
  afterEach(intercept.stop);

  it("should show unexpanded resource tree", async () => {
    await displayResources();
    expect(await inspectResources()).toEqual(RESOURCES_UNEXPANDED);
  });

  it("should show expanded group", async () => {
    await displayResources();
    await toggleExpansion("GROUP-1");
    expect(await inspectResources()).toEqual([
      { id: "A", type: "apache" },
      { id: "GROUP-1", type: "Group" },
      { id: "B", type: "Dummy" },
      { id: "C", type: "Dummy" },
      { id: "Clone-1", type: "Clone" },
      { id: "Clone-2", type: "Clone" },
    ]);
    await toggleExpansion("GROUP-1");
    expect(await inspectResources()).toEqual(RESOURCES_UNEXPANDED);
  });

  it("should show expanded clone with group", async () => {
    await displayResources();
    await toggleExpansion("Clone-1");
    await toggleExpansion("GROUP-2");
    expect(await inspectResources()).toEqual([
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
    expect(await inspectResources()).toEqual(RESOURCES_UNEXPANDED);
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

describe("Resource tree", () => {
  afterEach(intercept.stop);
  it("should show primitive resource detail", async () => {
    interceptWithCluster([
      route.resourceAgentDescribeAgent({
        clusterName: "ok",
        agentName: "ocf:heartbeat:apache",
        agentData: responses.resourceAgentMetadata.ocfHeartbeatApache,
      }),
    ])();
    await displayResources();
    await selectResource("A");
  });
});
