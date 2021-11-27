import { intercept, route } from "test/tools";
import { hasFieldError } from "test/tools/workflows";

import { task, url } from "./common";

const clusterName = "new-cluster";
const nodeNameList = ["node-1", "node-2"];

export const interceptForClusterSetup = (routeList: intercept.Route[] = []) =>
  intercept.run([
    route.importedClusterList(),
    route.resourceAgentListAgents(clusterName),
    route.can_add_cluster_or_nodes({ clusterName, nodeNameList }),
    route.sendKnownHostsToNode({ nodeNameList, targetNode: nodeNameList[0] }),
    ...routeList,
  ]);

describe("Cluster setup", () => {
  afterEach(intercept.stop);

  beforeEach(async () => {
    await page.goto(url.TASK);
  });

  it("should succesfully create simplest 2 node cluster", async () => {
    interceptForClusterSetup([
      route.check_auth_against_nodes({ nodeNameList }),
      route.clusterSetup({
        payload: {
          targetNode: nodeNameList[0],
          setupData: {
            cluster_name: clusterName,
            nodes: nodeNameList.map(nodeName => ({ name: nodeName })),
            transport_type: "knet",
            link_list: [],
          },
        },
      }),
    ]);
    await page.type(task.clusterName, clusterName);
    await page.type(task.nodeNameAt(0), nodeNameList[0]);
    await page.type(task.nodeNameAt(1), nodeNameList[1]);
    await task.nextFrom("Cluster name and nodes");
    await task.nextFrom("Check cluster name and nodes");
    await task.nextFrom("Transport links");
    await task.nextFrom("Transport Options");
    await task.nextFrom("Quorum");
    await task.nextFrom("Totem");
    await task.nextFrom("Review");
    await page.waitForSelector(task.sucess);
  });

  it("should succesfully setup cluster skipping optional steps", async () => {
    interceptForClusterSetup([
      route.check_auth_against_nodes({ nodeNameList }),
      route.clusterSetup({
        payload: {
          targetNode: nodeNameList[0],
          setupData: {
            cluster_name: clusterName,
            nodes: nodeNameList.map(nodeName => ({ name: nodeName })),
            transport_type: "knet",
            link_list: [],
          },
        },
      }),
    ]);
    await page.type(task.clusterName, clusterName);
    await page.type(task.nodeNameAt(0), nodeNameList[0]);
    await page.type(task.nodeNameAt(1), nodeNameList[1]);
    await task.nextFrom("Cluster name and nodes");
    await page.click(task.reviewAndFinish);
    await task.nextFrom("Review");
    await page.waitForSelector(task.sucess);
  });

  it("should refuse to continue without essential data", async () => {
    intercept.run([route.importedClusterList()]);
    await task.nextFrom("Cluster name and nodes");
    await hasFieldError(task.clusterName);
    await hasFieldError(task.lastNode);
  });

  it("should be possible go back from auth and change node name", async () => {
    interceptForClusterSetup([
      route.check_auth_against_nodes({
        nodeNameList,
        response: {
          json: {
            [nodeNameList[0]]: "Unable to authenticate",
            [nodeNameList[1]]: "Unable to authenticate",
          },
        },
      }),
    ]);
    await page.type(task.clusterName, clusterName);
    await page.type(task.nodeNameAt(0), nodeNameList[0]);
    await page.type(task.nodeNameAt(1), nodeNameList[1]);
    await task.nextFrom("Cluster name and nodes");
    await page.waitForSelector(task.authPasswordAt(nodeNameList[0]));
    await task.backFrom("Check cluster name and nodes");
    // TODO currently it is not possible to have multiple
    // check_auth_against_nodes with different query and strings...
  });

  it("should be mandatory fill node addresses in links", async () => {
    interceptForClusterSetup([
      route.check_auth_against_nodes({ nodeNameList }),
      route.clusterSetup({
        payload: {
          targetNode: nodeNameList[0],
          setupData: {
            cluster_name: clusterName,
            nodes: nodeNameList.map(nodeName => ({ name: nodeName })),
            transport_type: "knet",
            link_list: [],
          },
        },
      }),
    ]);
    await page.type(task.clusterName, clusterName);
    await page.type(task.nodeNameAt(0), nodeNameList[0]);
    await page.type(task.nodeNameAt(1), nodeNameList[1]);
    await task.nextFrom("Cluster name and nodes");
    await task.nextFrom("Check cluster name and nodes");
    await page.click(task.knetTransport.addLink);
    await task.nextFrom("Transport links");
    await hasFieldError(task.knetTransport.nodeAddr(0));
    await hasFieldError(task.knetTransport.nodeAddr(1));
  });
});
