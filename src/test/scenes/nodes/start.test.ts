import { intercept, location, shortcuts, url } from "test/tools";
import { dt } from "test/tools/selectors";

const nodeName = "node-1";
const clusterName = "ok";

const ACTION = dt("toolbar-node-start");
const CONFIRM = dt("toolbar-confirm-node-start");

const launchAction = async () => {
  await page.goto(location.node({ clusterName, nodeName }));
  await page.click(ACTION);
};

describe("Node start", () => {
  afterEach(intercept.stop);

  it("should successfully start", async () => {
    shortcuts.interceptWithCluster(clusterName, [
      {
        url: url.clusterStart({ clusterName }),
        body: { name: nodeName },
        text: "",
      },
    ]);

    await launchAction();

    await page.click(CONFIRM);
    await page.waitForSelector(dt("notification-success"));
  });

  it("should be cancelable", async () => {
    shortcuts.interceptWithCluster(clusterName);

    await launchAction();

    // possiblity to confirm is there...
    expect((await page.$$(CONFIRM)).length).toEqual(1);
    await page.click(dt("toolbar-cancel-node-start"));
    // ...possibility to comfirm disappeard
    expect((await page.$$(CONFIRM)).length).toEqual(0);
  });

  it("should deal with an error from backend", async () => {
    shortcuts.interceptWithCluster(clusterName, [
      {
        url: url.clusterStart({ clusterName }),
        body: { name: nodeName },
        status: [400, "Unable to start node."],
      },
    ]);

    await launchAction();

    await page.click(CONFIRM);
    await page.waitForSelector(dt("notification-danger"));
  });
});
