const { expect } = require("chai");

const { page } = require("test/store");
const { getPollyManager } = require("test/tools/pollyManager");
const { url, link } = require("test/tools/backendAddress");

const endpoints = require("dev/api/endpoints");
const responses = require("dev/api/responses/all");


const CLUSTERS_SELECTOR = "[aria-label='Cluster list'] [aria-label^='Cluster']";
const clusterOk = (selectors = "") => (
  `${CLUSTERS_SELECTOR}[aria-label$='ok'] ${selectors}`.trim()
);
const clusterError = (selectors = "") => (
  `${CLUSTERS_SELECTOR}[aria-label$='error'] ${selectors}`.trim()
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
    await page().waitFor(CLUSTERS_SELECTOR);

    const clusterInfoList = await page().$$eval(
      CLUSTERS_SELECTOR,
      clusterElements => clusterElements.map(e => ({
        name: e.querySelector("[data-label='name']").textContent,
        link: e.querySelector("[data-label='name'] a").attributes.href.value,
        issuesTotal: e.querySelector("[data-label='issues']").textContent,
        nodesTotal: e.querySelector("[data-label='nodes']").textContent,
        resourcesTotal: e.querySelector("[data-label='resources']").textContent,
        fenceDevicesTotal: e.querySelector("[data-label='fence-devices']")
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
    await page().waitFor(CLUSTERS_SELECTOR);
    await page().click(clusterError("[data-label='issues'] button"));
    await page().waitFor(clusterError("[aria-label='Issues status']"));

    const issues = await page().$$eval(
      clusterError("[aria-label='Issues status']"),
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
    await page().waitFor(CLUSTERS_SELECTOR);
    await page().click(clusterOk("[data-label='issues'] button"));
    // just check that it exists
    await page().waitFor(clusterOk("[aria-label='Issues status']"));
  });

  it("should allow to add existing cluster", async () => {
    pollyManager().reset(scenarios.simpleCluster);

    const actionSelector = (
      "[aria-label='Dashboard toolbar'] [aria-label='Add cluster']"
    );
    await page().goto(url());
    await page().waitFor(actionSelector);
    await page().click(actionSelector);
    expect(page().url()).to.equal(url("/add-cluster"));
  });

  it("should allow go to a cluster detail", async () => {
    pollyManager().reset(scenarios.multipleCluster);
    await page().goto(url());
    await page().waitFor(CLUSTERS_SELECTOR);
    await page().click(clusterOk("[data-label='name'] a"));
    expect(page().url()).to.equal(url("/cluster/ok"));
  });

  // THIS TEST SUCCEEDS but it causes strange behavior of mocha watch...
  // it("should allow go to a resource detail", async () => {
  //   pollyManager().reset(scenarios.multipleCluster);
  //   await page().goto(url());
  //   await page().waitFor(CLUSTERS_SELECTOR);
  //   await page().click(clusterOk("[data-label='resources'] button"));
  //   const resourceR1 = (selectors = "") => clusterOk(
  //     `[aria-label='Cluster resource list'] [aria-label='Resource R1'] ${selectors}`
  //     .trim()
  //   );
  //   await page().waitFor(resourceR1());
  //   await page().click(resourceR1("[data-label='name'] a"));
  //   expect(page().url()).to.equal(url("/cluster/ok/resources/R1"));
  // });
});
