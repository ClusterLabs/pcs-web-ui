const { expect } = require("chai");

const { getPollyServer, interceptByScenario } = require("app/test/tools");

const { display, goToCluster } = require("./backend-scenarios.js");

describe("Dashboard scene", () => {
  let page;

  before(async () => {
    page = await global.browser.newPage();
    await page.setRequestInterception(true);
  });

  after(async () => {
    await page.close();
  });

  it("should render correct information", async () => {
    const { server, polly } = getPollyServer(page, "checkTitle");

    interceptByScenario(server, display);

    await page.goto("http://localhost:3000");
    expect(await page.title()).to.eql("HA Cluster UI");

    const CLUSTER_SELECTOR = "[data-role='cluster-list'] [data-role-key]";
    await page.waitFor(CLUSTER_SELECTOR);
    const hrefTitles = await page.$$eval(
      CLUSTER_SELECTOR,
      el => el.map(e => e.attributes["data-role-key"].value),
    );
    expect(hrefTitles).to.have.lengthOf(2);
    expect(hrefTitles[0]).to.equal("first");
    expect(hrefTitles[1]).to.equal("second");

    await polly.flush();
    await polly.stop();
  });

  it("should allow to go to cluster detail", async () => {
    const { polly, server } = getPollyServer(page, "checkTitle");

    interceptByScenario(server, goToCluster);

    const CLUSTER_SELECTOR = "[data-role='cluster-list'] [data-role-key]";
    await page.goto("http://localhost:3000");
    await page.waitFor(CLUSTER_SELECTOR);
    await page.click(`${CLUSTER_SELECTOR}:nth-child(1) a`);
    expect(page.url()).to.equal("http://localhost:3000/ui/cluster/first");

    await polly.flush();
    await polly.stop();
  });
});
