import {intercept, route} from "test/tools";
import * as shortcuts from "test/shortcuts";

import {clusterName, interceptForClusterSetup, nodeNameList} from "./common";

const openTask = async () => {
  await page.goto(backend.rootUrl);
  await app.dashboard.toolbar.runSetupCluster.locator.click();
  await app.setupCluster.locator.waitFor({state: "visible"});
};

const {nameAndNodes, prepareNodes, review, success} = app.setupCluster;
const {fillClusterNameAndNodes} = shortcuts.setupCluster;

describe("Cluster setup", () => {
  afterEach(intercept.stop);

  it("should successfully setup cluster skipping optional steps", async () => {
    interceptForClusterSetup([
      route.checkAuthAgainstNodes({nodeNameList}),
      route.clusterSetup({
        payload: {
          targetNode: nodeNameList[0],
          setupData: {
            cluster_name: clusterName,
            nodes: nodeNameList.map(nodeName => ({name: nodeName})),
            transport_type: "knet",
            link_list: [],
          },
        },
      }),
    ]);
    await openTask();
    await fillClusterNameAndNodes({clusterName, nodeNameList});
    await nameAndNodes.next.locator.click();
    await prepareNodes.reviewAndFinish.locator.click();
    await review.next.locator.click();
    await success.locator.waitFor();
    await success.close.locator.click();
  });
});
