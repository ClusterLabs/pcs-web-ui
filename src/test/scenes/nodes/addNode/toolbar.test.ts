import { dt } from "test/tools/selectors";
import { intercept } from "test/tools";

import { TASK, interceptWithCluster, url } from "./common";

const NODE_ADD_BUTTON = dt("cluster-section-toolbar", "node-add");

describe("Node add button", () => {
  it("should launch add node task", async () => {
    interceptWithCluster([]);
    await page.goto(url.NODES);
    await page.click(NODE_ADD_BUTTON);
    await page.waitForSelector(TASK.VIEW);
    expect(page.url()).toEqual(url.TASK);
    await intercept.stop();
  });
});
