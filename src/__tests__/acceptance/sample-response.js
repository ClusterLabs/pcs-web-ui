const { expect } = require("chai");
const path = require("path");

const PuppeteerAdapter = require("@pollyjs/adapter-puppeteer");
const FsPersister = require("@pollyjs/persister-fs");
const { Polly } = require("@pollyjs/core");

Polly.register(PuppeteerAdapter);
Polly.register(FsPersister);

const responses = {
  clusters_overview: {
    cluster_list: [
      {
        cluster_name: "first"
      },
      {
        cluster_name: "second"
      },
      {
        cluster_name: "third"
      },
      {
        cluster_name: "last"
      }
    ]
  },
  cluster_status_first: {
    cluster_name: "first",
    error_list: [],
    warning_list: [],
    quorate: false,
    status: "error",
    node_list: [],
    resource_list: [],
    groups: [],
    constraints: {
      rsc_location: [
        {
          id: "location-R1-bat28-10",
          node: "bat28",
          rsc: "R1",
          score: "10"
        }
      ]
    },
    cluster_settings: {
      "have-watchdog": "false",
      "dc-version": "1.1.18-2.fc28.1-2b07d5c5a9",
      "cluster-infrastructure": "corosync",
      "cluster-name": "zoo28"
    },
    need_ring1_address: false,
    is_cman_with_udpu_transport: false,
    acls: {
      role: {},
      group: {},
      user: {},
      target: {}
    },
    username: "hacluster",
    fence_levels: {},
    node_attr: {},
    nodes_utilization: {},
    alerts: [],
    known_nodes: ["ape28", "bat28"],
    corosync_online: [],
    corosync_offline: ["ape28", "bat28"],
    pacemaker_online: ["ape28"],
    pacemaker_offline: ["bat28"],
    pacemaker_standby: [],
    status_version: "2"
  }
};

function getPollyServer(page, testName) {
  const polly = new Polly("datatest", {
    adapters: ["puppeteer"],
    adapterOptions: {
      puppeteer: { page }
    },
    persister: ["fs"],
    persisterOptions: {
      fs: {
        recordingsDir: path.join(__dirname, "recordings")
      }
    }
  });

  return {
    server: polly.server,
    polly
  };
}

describe("sample test of the UI - response", function() {
  let page;

  before(async function() {
    page = await browser.newPage();
    await page.setRequestInterception(true);
  });

  after(async function() {
    await page.close();
  });

  it("should have the correct page title", async function() {
    const { server, polly } = getPollyServer(page, "checkTitle");

    server.host("http://localhost:3000", () => {
      server.get("/clusters_overview").intercept((_, res) => {
        res.sendStatus(200).json(responses.clusters_overview);
      });
    });

    await page.goto("http://localhost:3000");

    expect(await page.title()).to.eql("HA Cluster UI");

    const CLUSTER_SELECTOR = "table tr td a";

    await page.waitFor(CLUSTER_SELECTOR);

    const hrefTitles = await page.$$eval(CLUSTER_SELECTOR, el =>
      el.map(e => e.textContent)
    );

    expect(hrefTitles).to.have.lengthOf(4);
    expect(hrefTitles[0]).to.equal("first");
    expect(hrefTitles[2]).to.equal("third");

    //    await polly.flush();
    await polly.stop();
  });

  it("should redirect to the selected cluster", async function() {
    const CLUSTER_SELECTOR = "table tr td";
    const TITLE_SELECTOR = "h1";

    const { polly, server } = getPollyServer(page, "checkTitle");

    server.host("http://localhost:3000", () => {
      server.get("/clusters_overview").intercept((_, res) => {
        res.sendStatus(200).json(responses.clusters_overview);
      });

      server.get("/managec/first/cluster_status").intercept((_, res) => {
        res.sendStatus(200).json(responses.cluster_status_first);
      });
    });

    await page.goto("http://localhost:3000");
    await page.waitFor(CLUSTER_SELECTOR);
    await page.click(CLUSTER_SELECTOR + ":nth-child(1) a");
    await page.waitFor(TITLE_SELECTOR);
    const title = await page.$eval(TITLE_SELECTOR, el => el.textContent);

    expect(title).to.equal("Cluster: first");
    expect(page.url()).to.equal("http://localhost:3000/ui/cluster/first");

    //    await polly.flush();
    await polly.stop();
  });
});
