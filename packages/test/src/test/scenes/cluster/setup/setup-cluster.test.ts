import * as responses from "dev/responses";

import {intercept, route} from "test/tools";
import * as shortcuts from "test/shortcuts";

import {
  clusterName,
  expectReports,
  interceptForClusterSetup,
  nodeNameList,
  openTask,
} from "./common";

const {
  nameAndNodes,
  nameAndNodesFooter,
  prepareNodesFooter,
  reviewFooter,
  success,
  unsuccess,
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

const sendMinimalSetup = async () => {
  await page.goto(backend.rootUrl);
  await openTask();
  await fillClusterNameAndNodes({clusterName, nodeNameList});
  await click(nameAndNodesFooter.next);
  await click(prepareNodesFooter.reviewAndFinish);
  await click(reviewFooter.next);
};

const taskClosed = async () => {
  await isAbsent(app.setupCluster);
};

describe("Cluster setup", () => {
  afterEach(intercept.stop);

  it("should successfully setup cluster skipping optional steps", async () => {
    interceptForClusterSetup([routeCheckAuth, routeClusterSetup()]);
    await sendMinimalSetup();
    await isVisible(success);
    await expectReports(0);
    await click(success.close);
    await taskClosed();
  });

  it("should display fail when backend returns an error", async () => {
    interceptForClusterSetup([
      routeCheckAuth,
      routeClusterSetup([responses.lib.report.error()]),
    ]);
    await sendMinimalSetup();
    await isVisible(unsuccess);
    await expectReports(1);
    await click(unsuccess.cancel);
    await taskClosed();
  });

  it("should get back when it fails", async () => {
    interceptForClusterSetup([
      routeCheckAuth,
      routeClusterSetup([responses.lib.report.error()]),
    ]);
    await sendMinimalSetup();
    await isVisible(unsuccess);
    await expectReports(1);
    await click(unsuccess.back);

    await isVisible(nameAndNodes);
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
    await isVisible(unsuccess);
    await expectReports(2);
  });
});
