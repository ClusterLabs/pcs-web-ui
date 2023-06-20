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
  reportList,
} = app.setupCluster;
const {fillClusterNameAndNodes} = shortcuts.setupCluster;

const routeClusterSetup = (
  errorList: Parameters<typeof responses.lib.error>[0] = [],
) =>
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
    ...(errorList.length === 0
      ? {}
      : {
          response: {
            json: responses.lib.error(errorList),
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

const unsuccessVisible = async () => {
  await unsuccess.locator.waitFor({state: "visible"});
};

const taskClosed = async () => {
  await app.setupCluster.locator.waitFor({state: "detached"});
};

const expectReports = async (count: number) => {
  expect(await reportList.report.locator.count()).toEqual(count);
};

describe("Cluster setup", () => {
  afterEach(intercept.stop);

  it("should successfully setup cluster skipping optional steps", async () => {
    interceptForClusterSetup([routeCheckAuth, routeClusterSetup()]);
    await sendMinimalSetup();
    await success.locator.waitFor();
    await expectReports(0);
    await success.close.locator.click();
    await taskClosed();
  });

  it("should display fail when backend returns an error", async () => {
    interceptForClusterSetup([
      routeCheckAuth,
      routeClusterSetup([responses.lib.report.error()]),
    ]);
    await sendMinimalSetup();
    await unsuccessVisible();
    await expectReports(1);
    await unsuccess.cancel.locator.click();
    await taskClosed();
  });

  it("should get back when it fails", async () => {
    interceptForClusterSetup([
      routeCheckAuth,
      routeClusterSetup([responses.lib.report.error()]),
    ]);
    await sendMinimalSetup();
    await unsuccessVisible();
    await expectReports(1);
    await unsuccess.back.locator.click();

    await nameAndNodes.locator.waitFor({state: "visible"});
  });

  it("shold display all reports", async () => {
    interceptForClusterSetup([
      routeCheckAuth,
      routeClusterSetup([
        responses.lib.report.error({message: {code: "ERROR_1"}}),
        responses.lib.report.error({message: {code: "ERROR_2"}}),
      ]),
    ]);
    await sendMinimalSetup();
    await unsuccessVisible();
    await reportList.locator.waitFor({state: "visible"});
    await expectReports(2);
  });
});
