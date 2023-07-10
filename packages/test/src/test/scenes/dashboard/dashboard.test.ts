import {api, clusterStatus} from "app/backend";

import * as responses from "dev/responses";

import {dt} from "test/tools/selectors";
import {intercept, location, route} from "test/tools";

const CLUSTERS = dt("cluster-list", "^cluster ");
const CLUSTER_OK = dt("cluster-list", "cluster ok");
const CLUSTER_ERROR = dt("cluster-list", "cluster error");

const displayClusters = async () => {
  await page.goto(location.dashboard);
  await page.waitForSelector(
    [dt(CLUSTER_OK, "loaded"), dt(CLUSTER_ERROR, "loaded")].join(","),
  );
};

type ClusterStatus = api.PayloadOf<typeof clusterStatus>;

const clusterName = "ok";

const interceptWithDashboard = (routeList: intercept.Route[]) =>
  intercept.run([
    route.importedClusterList({
      clusterStatusList: [
        responses.clusterStatus.ok,
        responses.clusterStatus.error,
      ],
    }),
    route.clusterStatus({clusterStatus: responses.clusterStatus.ok}),
    route.resourceAgentListAgents(clusterName),
    route.stonithAgentListAgents({clusterName}),
    route.getClusterPropertiesDefinition({clusterName}),
    route.getPermissions({clusterName}),
    route.clusterStatus({clusterStatus: responses.clusterStatus.error}),
    ...routeList,
  ]);

describe("Dashboard scene", () => {
  beforeEach(() => interceptWithDashboard([]));

  afterEach(intercept.stop);

  it("should render multiple cluster information", async () => {
    await displayClusters();
    const clusterInfoList = await page.$$eval(CLUSTERS, clusterElements =>
      clusterElements.map(e => ({
        name:
          e.querySelector("[data-test='name'] strong")?.textContent?.trim()
          ?? "",
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
          ).map(ae => {
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
});
