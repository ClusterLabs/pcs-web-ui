import * as t from "dev/responses/clusterStatus/tools";

import * as workflow from "test/workflow";
import { intercept, location, shortcuts } from "test/tools";

const { nodes } = workflow.cluster;

export const node1 = t.node("1");
export const node1Utilization = [
  { id: "N1_test_one", name: "test_one", value: "100" },
  { id: "N1_test_two", name: "test_two", value: "200" },
];

export const clusterStatus = t.cluster("test-cluster", "ok", {
  node_list: [node1],
  nodes_utilization: { [node1.name]: node1Utilization },
});

export const interceptWithUtilization = (
  additionalRouteList: intercept.Route[] = [],
) => {
  return shortcuts.interceptWithCluster({
    clusterStatus,
    additionalRouteList: additionalRouteList,
  });
};

export const openUtilizationTab = async () => {
  await page.goto(
    location.node({
      clusterName: clusterStatus.cluster_name,
      nodeName: node1.name,
    }),
  );
  await nodes.selectTab("utilization");
};
