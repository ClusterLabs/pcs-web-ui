const { expect } = require("chai");

const {
  getPollyServer,
  interceptByScenario,
  url,
  link,
} = require("app/test/tools");

const { displayMulti, goToCluster } = require("./backend-scenarios.js");

describe("Dashboard scene", () => {
  let page;
  let polly;
  let server;
  const CLUSTERS_SELECTOR = "[data-role='cluster-list'] [data-role='cluster']";

  const renderClustersFromScenario = async (scenario) => {
    interceptByScenario(server, scenario);
    await page.goto(url());
    await page.waitFor(CLUSTERS_SELECTOR);
  };

  before(async () => {
    page = await global.browser.newPage();
    await page.setRequestInterception(true);
  });

  after(async () => {
    await page.close();
  });

  beforeEach(() => {
    ({ server, polly } = getPollyServer(page));
  });

  afterEach(async () => {
    await polly.flush();
    await polly.stop();
  });

  it("should render multiple cluster information", async () => {
    await renderClustersFromScenario(displayMulti);

    const clusterInfoList = await page.$$eval(
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
        status: "warning",
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
    await renderClustersFromScenario(goToCluster);
    await page.click(`${CLUSTERS_SELECTOR}:nth-child(1) a`);
    expect(page.url()).to.equal(url("/cluster/cluster-1"));
  });
});
