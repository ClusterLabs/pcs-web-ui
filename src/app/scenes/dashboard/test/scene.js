const { expect } = require("chai");

const { page } = require("test/store");
const { getPollyManager } = require("test/tools/pollyManager");
const { url, link } = require("test/tools/backendAddress");

const endpoints = require("dev/api/endpoints");
const responses = require("dev/api/responses/all");


const CLUSTERS_SELECTOR = "[data-role='cluster-list'] [data-role='cluster']";
const clusters = (selectors = "") => `${CLUSTERS_SELECTOR} ${selectors}`.trim();
const cluster1 = (selectors = "") => (
  `${CLUSTERS_SELECTOR}[data-role-key='cluster-1'] ${selectors}`.trim()
);
const cluster2 = (selectors = "") => (
  `${CLUSTERS_SELECTOR}[data-role-key='cluster-2'] ${selectors}`.trim()
);

const pollyManager = getPollyManager(() => page());

const scenarios = {
  simpleCluster: [
    endpoints.clustersOverview((req, res) => {
      res.json(responses.clustersOverview.withClusters([
        responses.clusterStatus.ok,
      ]));
    }),
    endpoints.clusterStatus((req, res) => {
      res.json(responses.clusterStatus.ok);
    }),
  ],
  multipleCluster: [
    endpoints.clustersOverview((req, res) => {
      res.json(responses.clustersOverview.withClusters([
        responses.clusterStatus.ok,
        responses.clusterStatus.error,
      ]));
    }),
  ],
};

describe("Dashboard scene", () => {
  afterEach(async () => { await pollyManager().stop(); });

  it("should render multiple cluster information", async () => {
    pollyManager().reset(scenarios.multipleCluster);

    await page().goto(url());
    await page().waitFor(clusters());

    const clusterInfoList = await page().$$eval(
      clusters(),
      clusterElements => clusterElements.map(e => ({
        name: e.querySelector("[data-role='detail-link']").textContent,
        link: e.querySelector("[data-role='detail-link']")
          .attributes.href.value
        ,
        issuesTotal: e.querySelector("[data-role='issues-total']").textContent,
        nodesTotal: e.querySelector("[data-role='nodes-total']").textContent,
        resourcesTotal: e.querySelector("[data-role='resources-total']")
          .textContent
        ,
        fenceDevicesTotal: e.querySelector("[data-role='fence-devices-total']")
          .textContent
        ,

      })),
    );

    const response2Info = (response) => ({
      name: response.cluster_name,
      link: link(`/cluster/${response.cluster_name}`),
      issuesTotal: (response.error_list.length + response.warning_list.length)
        .toString()
      ,
      nodesTotal: response.node_list.length.toString(),
      resourcesTotal: response.resource_list.filter(r => !r.stonith).length
        .toString()
      ,
      fenceDevicesTotal: response.resource_list.filter(r => r.stonith).length
        .toString()
      ,
    });

    expect(clusterInfoList).to.eql([
      response2Info(responses.clusterStatus.ok),
      response2Info(responses.clusterStatus.error),
    ]);
  });

  it("should allow to display cluster issues", async () => {
    pollyManager().reset(scenarios.multipleCluster);
    await page().goto(url());
    await page().waitFor(cluster2());
    await page().click(cluster2("[data-role='issues-total'] button"));
    await page().waitFor(cluster2("[data-role='issues-status']"));

    const issues = await page().$$eval(
      cluster2("[data-role='issues-status']"),
      issuesBoxes => issuesBoxes.map(e => ({
        status: e.dataset.roleValue,
        alerts: Array.from(e.querySelectorAll("[aria-label='cluster issue']>*"))
          .map(ae => ae.textContent)
        ,
      })),
    );
    expect(issues).to.eql([{
      status: "error",
      alerts: [
        "danger alert: Unable to connect to the cluster.",
        "warning alert: No fencing configured in the cluster",
        "warning alert: Not authorized against node(s) node-3",
      ],
    }]);
  });

  it("should allow to display empty cluster issues", async () => {
    pollyManager().reset(scenarios.multipleCluster);

    await page().goto(url());
    await page().waitFor(cluster1());
    await page().click(cluster1("[data-role='issues-total'] button"));
    await page().waitFor(cluster1("[data-role='issues-status']"));

    const clusterStatuses = await page().$$eval(
      cluster1("[data-role='issues-status']"),
      statuses => statuses.map(e => e.dataset.roleValue),
    );
    expect(clusterStatuses).to.eql(["ok"]);
  });

  it("should allow to add existing cluster", async () => {
    pollyManager().reset(scenarios.simpleCluster);

    const actionSelector = "[data-role='add-cluster']";
    await page().goto(url());
    await page().waitFor(actionSelector);
    await page().click(actionSelector);
    expect(page().url()).to.equal(url("/add-cluster"));
  });
});
