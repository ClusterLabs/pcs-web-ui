const { expect } = require("chai");
const { page } = require("app/test/store");

const {
  getPollyManager,
  url,
  link,
} = require("app/test/tools");
const endpoints = require("dev/api/endpoints");
const responses = require("./responses");

const CLUSTERS_SELECTOR = "[data-role='cluster-list'] [data-role='cluster']";

const pollyManager = getPollyManager(() => page());

const scenarios = {
  simpleCluster: [
    endpoints.clustersOverview((req, res) => {
      res.json(responses.dashboard([responses.cluster.ok]));
    }),
    endpoints.clusterStatus((req, res) => {
      res.json(responses.cluster.ok);
    }),
  ],
  multipleCluster: [
    endpoints.clustersOverview((req, res) => {
      res.json(responses.dashboard([
        responses.cluster.ok,
        responses.cluster.error,
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
        name: e.querySelector("[data-role='detail-link']").textContent,
        link: e.querySelector("[data-role='detail-link']")
          .attributes.href.value
        ,
        status: e.querySelector("[data-role='status']")
          .attributes["data-role-key"].value
        ,
        nodes: {
          total: e.querySelector("[data-role='nodes'] [data-role='total']")
            .textContent
          ,
          link: e.querySelector("[data-role='nodes'] [data-role='link']")
            .attributes.href.value
          ,
        },
        resources: {
          total: e
            .querySelector("[data-role='resources'] [data-role='total']")
            .textContent
          ,
        },
      })),
    );

    expect(clusterInfoList).to.eql([
      {
        name: "cluster-1",
        link: link("/cluster/cluster-1"),
        status: "ok",
        nodes: {
          total: "2",
          link: link("/cluster/cluster-1/nodes"),
        },
        resources: {
          total: "1",
        },
      },
      {
        name: "cluster-2",
        link: link("/cluster/cluster-2"),
        status: "error",
        nodes: {
          total: "3",
          link: link("/cluster/cluster-2/nodes"),
        },
        resources: {
          total: "1",
        },
      },
    ]);
  });

  it("should allow to go to cluster detail", async () => {
    pollyManager().reset(scenarios.simpleCluster);

    await page().goto(url());
    await page().waitFor(CLUSTERS_SELECTOR);
    await page().click(`${CLUSTERS_SELECTOR}:nth-child(1) a`);
    expect(page().url()).to.equal(url("/cluster/cluster-1"));
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
