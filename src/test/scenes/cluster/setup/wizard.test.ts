import {intercept, location, route} from "test/tools";
import * as workflow from "test/workflow";

import {clusterName, interceptForClusterSetup, nodeNameList} from "./common";

const {hasFieldError} = workflow.form;

const {
  nextFrom,
  backFrom,
  fillClusterNameAndNodes,
  open,
  selectors,
  waitForSuccess,
  reviewAndFinish,
} = workflow.task.clusterSetup;

const openTask = async () => {
  await page.goto(location.dashboard);
  await open();
};

describe("Cluster setup", () => {
  afterEach(intercept.stop);

  it("should successfully create simplest 2 node cluster", async () => {
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
    await nextFrom("Cluster name and nodes");
    await nextFrom("Check cluster name and nodes");
    await nextFrom("Transport links");
    await nextFrom("Transport Options");
    await nextFrom("Quorum");
    await nextFrom("Totem");
    await nextFrom("Review");
    await waitForSuccess();
  });

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
    await nextFrom("Cluster name and nodes");
    await reviewAndFinish();
    await nextFrom("Review");
    await waitForSuccess();
  });

  it("should refuse to continue without essential data", async () => {
    intercept.run([route.importedClusterList()]);
    await openTask();
    await nextFrom("Cluster name and nodes");
    await hasFieldError(selectors.clusterName);
    await hasFieldError(selectors.lastNode);
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
    await openTask();
    await fillClusterNameAndNodes({clusterName, nodeNameList});
    await nextFrom("Cluster name and nodes");
    await page.waitForSelector(selectors.authPasswordAt(nodeNameList[0]));
    await backFrom("Check cluster name and nodes");
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
    await openTask();
    await fillClusterNameAndNodes({clusterName, nodeNameList});
    await nextFrom("Cluster name and nodes");
    await nextFrom("Check cluster name and nodes");
    await page.click(selectors.knetTransport.addLink);
    await nextFrom("Transport links");
    await hasFieldError(selectors.knetTransport.nodeAddr(0));
    await hasFieldError(selectors.knetTransport.nodeAddr(1));
  });
});
