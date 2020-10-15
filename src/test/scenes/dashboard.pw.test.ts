import { api } from "app/backend";

import * as responses from "dev/responses";

import { dt } from "test/tools/selectors";
import { intercept, url } from "test/tools";

const CLUSTERS = dt("cluster-list", "^cluster ");
const CLUSTER_OK = dt("cluster-list", "cluster ok");
const CLUSTER_ERROR = dt("cluster-list", "cluster error");

const displayClusters = async () => {
  await page.goto(url());
  await page.waitForSelector([CLUSTER_OK, CLUSTER_ERROR].join(","));
};

type ClusterStatus = api.types.clusterStatus.ApiClusterStatus;

const interceptWithDashboard = (routeList: intercept.Route[]) =>
  intercept.start([
    {
      url: "/imported-cluster-list",
      json: responses.importedClusterList.withClusters([
        responses.clusterStatus.ok.cluster_name,
        responses.clusterStatus.error.cluster_name,
      ]),
    },
    {
      url: "/managec/empty/cluster_status",
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
    {
      url: "/managec/ok/cluster_status",
      json: responses.clusterStatus.ok,
    },
    {
      url: "/managec/error/cluster_status",
      json: responses.clusterStatus.error,
    },
    ...routeList,
  ]);

describe("Dashboard scene", () => {
  beforeEach(interceptWithDashboard([]));

  afterEach(intercept.stop);

  it("should render multiple cluster information", async () => {
    await displayClusters();
    const clusterInfoList = await page.$$eval(CLUSTERS, clusterElements =>
      clusterElements.map(e => ({
        name: e.querySelector("[data-test='name']")?.textContent ?? "",
        issuesTotal: e.querySelector("[data-test='issues']")?.textContent ?? "",
        nodesTotal: e.querySelector("[data-test='nodes']")?.textContent ?? "",
        resourcesTotal:
          e.querySelector("[data-test='resources']")?.textContent ?? "",
        fenceDevicesTotal:
          e.querySelector("[data-test='fence-devices']")?.textContent ?? "",
      })),
    );

    const response2Info = (response: ClusterStatus) => ({
      name: response.cluster_name,
      issuesTotal: (
        response.error_list.length + response.warning_list.length
      ).toString(),
      nodesTotal: response.node_list.length.toString(),
      resourcesTotal: response.resource_list
        .filter(r => !("stonith" in r) || !r.stonith)
        .length.toString(),
      fenceDevicesTotal: response.resource_list
        .filter(r => "stonith" in r && r.stonith)
        .length.toString(),
    });

    expect(clusterInfoList).toEqual([
      response2Info(responses.clusterStatus.error as ClusterStatus),
      response2Info(responses.clusterStatus.ok as ClusterStatus),
    ]);
  });

  it("should allow to display cluster issues", async () => {
    await displayClusters();
    await page.click(dt(CLUSTER_ERROR, "issues", "expansion-button"));
    await page.waitForSelector(dt(CLUSTER_ERROR, "issues-status"));

    const issues = await page.$$eval(
      dt(CLUSTER_ERROR, "issues-status"),
      issuesBoxes =>
        issuesBoxes.map(e => ({
          alerts: Array.from(
            e.querySelectorAll("[data-test^='cluster-issue']"),
          ).map((ae) => {
            const attrs = ae.attributes;
            for (let i = 0; i < attrs.length; i++) {
              const a = attrs.item(i);
              if (a?.name === "data-test") {
                return a.value;
              }
            }
            return undefined;
          }),
        })),
    );
    expect(issues).toEqual([
      {
        alerts: [
          "cluster-issue ERROR Unable to connect to the cluster.",
          "cluster-issue WARNING No fencing configured in the cluster",
          "cluster-issue WARNING Not authorized against node(s) node-3",
        ],
      },
    ]);
  });
  it("should allow to display empty cluster issues", async () => {
    await displayClusters();
    await page.click(dt(CLUSTER_OK, "issues", "expansion-button"));
    // just check that it exists
    await page.waitForSelector(dt(CLUSTER_OK, "issues-status"));
  });

  it("should allow to add existing cluster", async () => {
    const actionSelector = dt("dashboard-toolbar", "add-cluster");
    await page.goto(url());
    await page.waitForSelector(actionSelector);
    await page.click(actionSelector);
    expect(page.url()).toEqual(url("/add-cluster"));
  });
});

describe("Dashboard to cluster scene", () => {
  afterEach(intercept.stop);

  it("should allow go to a cluster detail", async () => {
    await interceptWithDashboard([])();
    await displayClusters();
    await page.click(dt(CLUSTER_OK, "name", "link"));
    expect(page.url()).toEqual(url("/cluster/ok"));
  });

  it("should allow go to a node detail", async () => {
    await interceptWithDashboard([])();
    await displayClusters();
    await page.click(dt(CLUSTER_OK, "nodes", "expansion-button"));

    const NODE_1 = dt(CLUSTER_OK, "node-list", "node node-1");
    await page.waitForSelector(NODE_1);
    await page.click(dt(NODE_1, "name", "link"));
    expect(page.url()).toEqual(url("/cluster/ok/nodes/node-1"));
  });

  it("should allow go to a resource detail", async () => {
    await interceptWithDashboard([
      {
        url: "/managec/ok/get_resource_agent_metadata",
        query: { agent: "ocf:heartbeat:Dummy" },
        json: responses.resourceAgentMetadata.ocfHeartbeatDummy,
      },
    ])();
    await displayClusters();
    await page.click(dt(CLUSTER_OK, "resources", "expansion-button"));

    const RESOURCE_R1 = dt(CLUSTER_OK, "resource-list", "resource R1");
    await page.waitForSelector(RESOURCE_R1);
    await page.click(dt(RESOURCE_R1, "name", "link"));
    await page.waitForSelector(dt("agent-description"));
    // console.log("TU 2");
    expect(page.url()).toEqual(url("/cluster/ok/resources/R1"));
  });

  it("should allow go to a fence device detail", async () => {
    await interceptWithDashboard([
      {
        url: "/managec/ok/get_fence_agent_metadata",
        query: { agent: "stonith:fence_apc" },
        json: responses.fenceAgentMetadata.ok,
      },
    ])();
    await displayClusters();
    await page.click(dt(CLUSTER_OK, "fence-devices", "expansion-button"));

    const FENCE_DEVICE_1 = dt(
      CLUSTER_OK,
      "fence-device-list",
      "fence-device F1",
    );
    await page.waitForSelector(FENCE_DEVICE_1);
    await page.click(dt(FENCE_DEVICE_1, "name", "link"));
    expect(page.url()).toEqual(url("/cluster/ok/fence-devices/F1"));
  });
});
