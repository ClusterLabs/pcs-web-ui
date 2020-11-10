import { dt } from "test/tools/selectors";
import { intercept } from "test/tools";

import { WIZARD, interceptWithCluster, url } from "./common";

const NODE_ADD_BUTTON = dt("cluster-section-toolbar", "node-add");

describe("Node add button", () => {
  it("should launch add node wizard", async () => {
    interceptWithCluster([]);
    await page.goto(url.NODES);
    await page.click(NODE_ADD_BUTTON);
    await page.waitForSelector(WIZARD.VIEW);
    expect(page.url()).toEqual(url.WIZARD);
    await intercept.stop();
  });
});
