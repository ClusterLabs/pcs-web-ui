const { expect } = require("chai");
const path = require("path");

const PuppeteerAdapter = require("@pollyjs/adapter-puppeteer");
const FsPersister = require("@pollyjs/persister-fs");
const { Polly } = require("@pollyjs/core");

Polly.register(PuppeteerAdapter);
Polly.register(FsPersister);

function getPollyServer(page, testName) {
  const polly = new Polly(testName, {
    adapters: ["puppeteer"],
    adapterOptions: {
      puppeteer: { page },
    },
    persister: ["fs"],
    persisterOptions: {
      fs: {
        recordingsDir: path.join(__dirname, "recordings"),
      },
    },
  });

  return {
    server: polly.server,
    polly,
  };
}

describe("sample test of the UI - replay", () => {
  let page;

  before(async () => {
    page = await global.browser.newPage();
    await page.setRequestInterception(true);
  });

  after(async () => {
    await page.close();
  });

  it("should have the correct page title", async () => {
    const { polly } = getPollyServer(page, "checkTitle");

    await page.goto("http://localhost:3000");

    expect(await page.title()).to.eql("HA Cluster UI");

    const CLUSTER_SELECTOR = "[data-role='cluster-list'] [data-role-key]";

    await page.waitFor(CLUSTER_SELECTOR);

    const hrefTitles = await page.$$eval(
      CLUSTER_SELECTOR,
      el => el.map(e => e.attributes["data-role-key"].value),
    );

    expect(hrefTitles).to.have.lengthOf(3);
    expect(hrefTitles[0]).to.equal("first");
    expect(hrefTitles[1]).to.equal("second");
    expect(hrefTitles[2]).to.equal("third");

    //    await polly.flush();
    await polly.stop();
  });

  it("should redirect to the selected cluster", async () => {
    const { polly } = getPollyServer(page, "loadFirstCluster");
    /*    polly.configure({
      mode: "record",
      recordFailedRequests: true
    });
*/
    const CLUSTER_SELECTOR = "[data-role='cluster-list'] [data-role-key]";
    await page.goto("http://localhost:3000");
    await page.waitFor(CLUSTER_SELECTOR);
    await page.click(`${CLUSTER_SELECTOR}:nth-child(1) a`);

    expect(page.url()).to.equal("http://localhost:3000/ui/cluster/first");

    //    await polly.flush();
    await polly.stop();
  });
});
