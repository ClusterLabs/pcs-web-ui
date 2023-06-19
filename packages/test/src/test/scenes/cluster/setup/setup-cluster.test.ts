import * as responses from "dev/responses";

import {intercept, route} from "test/tools";
import * as shortcuts from "test/shortcuts";

import {clusterName, interceptForClusterSetup, nodeNameList} from "./common";

const {
  nameAndNodes,
  nameAndNodesFooter,
  prepareNodesFooter,
  reviewFooter,
  success,
  unsuccess,
} = app.setupCluster;
const {fillClusterNameAndNodes} = shortcuts.setupCluster;

const routeClusterSetup = ({error}: {error: boolean} = {error: false}) =>
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
    ...(!error
      ? {}
      : {
          response: {
            json: responses.lib.error([responses.lib.report.error()]),
          },
        }),
  });

const routeCheckAuth = route.checkAuthAgainstNodes({nodeNameList});

const openTask = async () => {
  await page.goto(backend.rootUrl);
  await app.dashboard.toolbar.runSetupCluster.locator.click();
  await app.setupCluster.locator.waitFor({state: "visible"});
};

const sendMinimalSetup = async () => {
  await openTask();
  await fillClusterNameAndNodes({clusterName, nodeNameList});
  await nameAndNodesFooter.next.locator.click();
  await prepareNodesFooter.reviewAndFinish.locator.click();
  await reviewFooter.next.locator.click();
};

describe("Cluster setup", () => {
  afterEach(intercept.stop);

  it("should successfully setup cluster skipping optional steps", async () => {
    interceptForClusterSetup([routeCheckAuth, routeClusterSetup()]);
    await sendMinimalSetup();
    await success.locator.waitFor();
    await success.close.locator.click();
  });

  it.only("should display fail when backend returns an error", async () => {
    interceptForClusterSetup([
      routeCheckAuth,
      routeClusterSetup({error: true}),
    ]);
    await sendMinimalSetup();
    await unsuccess.cancel.locator.highlight();
    await unsuccess.locator.waitFor({state: "visible"});
    await unsuccess.cancel.locator.click();
    await app.setupCluster.locator.waitFor({state: "detached"});
  });

  it("should get back when it fails", async () => {
    interceptForClusterSetup([
      routeCheckAuth,
      routeClusterSetup({error: true}),
    ]);
    await sendMinimalSetup();
    await unsuccess.locator.waitFor();
    await unsuccess.back.locator.click();

    await nameAndNodes.locator.waitFor({state: "visible"});
  });
});
