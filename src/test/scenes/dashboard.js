const { expect } = require("chai");

const { page } = require("test/store");
const { getPollyManager } = require("test/tools/pollyManager");
const { url, link } = require("test/tools/backendAddress");

const endpoints = require("dev/api/endpoints");
const responses = require("dev/api/responses/all");


const CLUSTERS_SELECTOR = "[data-role='cluster-list'] [data-role='cluster']";
const clusters = (selectors = "") => `${CLUSTERS_SELECTOR} ${selectors}`.trim();
const clusterOk = (selectors = "") => (
  `${CLUSTERS_SELECTOR}[data-role-key='ok'] ${selectors}`.trim()
);
const clusterError = (selectors = "") => (
  `${CLUSTERS_SELECTOR}[data-role-key='error'] ${selectors}`.trim()
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
      response2Info(responses.clusterStatus.error),
      response2Info(responses.clusterStatus.ok),
    ]);
  });

  it("should allow to display cluster issues", async () => {
    pollyManager().reset(scenarios.multipleCluster);
    await page().goto(url());
    await page().waitFor(clusterError());
    await page().click(clusterError("[data-role='issues-total'] button"));
    await page().waitFor(clusterError("[data-role='issues-status']"));

    const issues = await page().$$eval(
      clusterError("[data-role='issues-status']"),
      issuesBoxes => issuesBoxes.map(e => ({
        alerts: Array.from(e.querySelectorAll("[aria-label='cluster issue']>*"))
          .map(ae => ae.textContent)
        ,
      })),
    );
    expect(issues).to.eql([{
      alerts: [
        "Danger alert:Unable to connect to the cluster.",
        "Warning alert:No fencing configured in the cluster",
        "Warning alert:Not authorized against node(s) node-3",
      ],
    }]);
  });

  it("should allow to display empty cluster issues", async () => {
    pollyManager().reset(scenarios.multipleCluster);

    await page().goto(url());
    await page().waitFor(clusterOk());
    await page().click(clusterOk("[data-role='issues-total'] button"));
    // just check that it exists
    await page().waitFor(clusterOk("[data-role='issues-status']"));
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
