const { expect } = require("chai");

describe("sample test of the UI", function() {
  let page;

  before(async function() {
    page = await browser.newPage();
    await page.goto("http://localhost:3000");
  });

  after(async function() {
    await page.close();
  });

  it("should have the correct page title", async function() {
    expect(await page.title()).to.eql("HA Cluster UI");
  });

  it("should have a three cluster with loaded names", async function() {
    const CLUSTER_SELECTOR = "table tr td a";

    await page.waitFor(CLUSTER_SELECTOR);

    const hrefTitles = await page.$$eval(CLUSTER_SELECTOR, el =>
      el.map(e => e.textContent)
    );

    expect(hrefTitles).to.have.lengthOf(3);
    expect(hrefTitles[0]).to.equal("first");
    expect(hrefTitles[2]).to.equal("third");
  });

  it("should redirect to the selected cluster", async function() {
    const CLUSTER_SELECTOR = "table tr td";
    const TITLE_SELECTOR = "h1";

    await page.waitFor(CLUSTER_SELECTOR);
    await page.click(CLUSTER_SELECTOR + ":nth-child(1) a");
    await page.waitFor(TITLE_SELECTOR);
    const title = await page.$eval(TITLE_SELECTOR, el => el.textContent);

    expect(title).to.equal("Cluster: first");
    expect(page.url()).to.equal("http://localhost:3000/ui/cluster/first");
  });
});
