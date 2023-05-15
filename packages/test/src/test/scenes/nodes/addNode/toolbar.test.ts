import {dt} from "test/tools/selectors";
import {intercept, shortcuts} from "test/tools";

import {TASK, url} from "./common";

const NODE_ADD_BUTTON = dt("cluster-section-toolbar", "task nodes-add-node");

describe("Node add button", () => {
  it("should launch add node task", async () => {
    shortcuts.interceptWithCluster({
      clusterName: "actions",
      additionalRouteList: [],
    });
    await page.goto(url.NODES);
    await page.click(NODE_ADD_BUTTON);
    await page.waitForSelector(TASK.VIEW);
    await intercept.stop();
  });
});
