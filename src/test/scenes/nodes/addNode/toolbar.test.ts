import { dt } from "test/tools/selectors";
import { intercept, shortcuts } from "test/tools";

import { TASK, url } from "./common";

const NODE_ADD_BUTTON = dt("cluster-section-toolbar", "node-add");

describe("Node add button", () => {
  it("should launch add node task", async () => {
    shortcuts.interceptWithCluster({
      clusterName: "actions",
      additionalRouteList: [],
    });
    await page.goto(url.NODES);
    await page.click(NODE_ADD_BUTTON);
    await page.waitForSelector(TASK.VIEW);
    expect(page.url()).toEqual(url.TASK);
    await intercept.stop();
  });
});
