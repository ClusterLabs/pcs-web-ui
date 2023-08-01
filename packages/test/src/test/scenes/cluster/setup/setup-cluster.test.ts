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
  prepareNodes,
  prepareNodesFooter,
  advancedOptions,
  advancedOptionsFooter,
  reviewFooter,
  success,
  unsuccess,
} = marks.task.clusterSetup;

const {fillClusterNameAndNodes} = shortcuts.setupCluster;
const {fieldError} = shortcuts.patternfly;

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
  await isAbsent(marks.task.clusterSetup);
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

  it("should refuse to continue without essential data", async () => {
    intercept.run([route.importedClusterList()]);
    await page.goto(backend.rootUrl);
    await openTask();
    await click(nameAndNodesFooter.next);
    await isVisible(fieldError(nameAndNodes.clusterName));
    await isVisible(fieldError(nameAndNodes.node.name.locator.last()));
  });

  it("should be possible go back from auth and change node name", async () => {
    interceptForClusterSetup([
      route.checkAuthAgainstNodes({
        nodeNameList,
        response: {
          json: {
            [nodeNameList[0]]: "Unable to authenticate",
            [nodeNameList[1]]: "Unable to authenticate",
          },
        },
      }),
    ]);
    await page.goto(backend.rootUrl);
    await openTask();
    await fillClusterNameAndNodes({clusterName, nodeNameList});
    await click(nameAndNodesFooter.next);
    await isVisible(prepareNodes.auth);
    await click(prepareNodesFooter.back);
    await isVisible(nameAndNodes.node.locator.first());
    // TODO currently it is not possible to have multiple
    // check_auth_against_nodes with different query and strings...
  });

  it("should be mandatory fill node addresses in links", async () => {
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
    const {transportKnet} = advancedOptions;
    await page.goto(backend.rootUrl);
    await openTask();
    await fillClusterNameAndNodes({clusterName, nodeNameList});
    await click(nameAndNodesFooter.next);
    await click(prepareNodesFooter.next);
    await click(transportKnet.addKnetLink);
    await click(advancedOptionsFooter.next);
    await isVisible(fieldError(transportKnet.knetLink.address.locator.nth(0)));
    await isVisible(fieldError(transportKnet.knetLink.address.locator.nth(1)));
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
