import * as responses from "dev/responses";

import { dt } from "test/tools/selectors";
import { intercept, location, url } from "test/tools";

const clusterName = "ok";

const interceptWithDashboard = async (routeList: intercept.Route[]) => {
  await intercept.run([
    {
      url: url.importedClusterList,
      json: responses.importedClusterList.withClusters([
        responses.clusterStatus.ok.cluster_name,
      ]),
    },
    {
      url: url.clusterStatus({ clusterName }),
      json: responses.clusterStatus.ok,
    },
    ...routeList,
  ]);
};

const tryRemovingCluster = async () => {
  await page.goto(location.dashboard);
  await page.click(
    dt("cluster-list", `cluster ${clusterName}`, '[aria-label="Actions"]'),
  );
  await page.click(dt("remove-cluster"));
  await page.click(dt("confirm"));
};

describe("Cluster remove", () => {
  afterEach(intercept.stop);

  it("should be successfully removed", async () => {
    await interceptWithDashboard([
      {
        url: url.removeCluster,
        body: { "clusterid-ok": "true" },
        text: "",
      },
    ]);

    await tryRemovingCluster();
    await page.waitForSelector(dt("notification-success"));
  });

  it("should be cancelable", async () => {
    await interceptWithDashboard([]);

    await page.goto(location.dashboard);
    await page.click(dt('[aria-label="Actions"]'));
    await page.click(dt("remove-cluster"));

    // possiblity to confirm is there...
    expect((await page.$$(dt("confirm"))).length).toEqual(1);
    await page.click(dt("cancel"));
    // ...possibility to comfirm disappeard
    expect((await page.$$(dt("confirm"))).length).toEqual(0);
  });

  it("should deal with an error", async () => {
    await interceptWithDashboard([
      {
        url: url.removeCluster,
        body: { "clusterid-ok": "true" },
        status: [400, ""],
      },
    ]);

    await tryRemovingCluster();
    await page.waitForSelector(dt("notification-danger"));
  });
});
