import * as t from "dev/responses/clusterStatus/tools";

import * as workflow from "test/workflow";
import {intercept, location, shortcuts} from "test/tools";

const {nodes} = workflow.cluster;

export const node1 = t.node("1");
export const node1Attrs = [
  {id: "N1_attr_one", name: "attr_one", value: "one"},
  {id: "N1_attr_two", name: "attr_two", value: "to"},
];

export const clusterStatus = t.cluster("test-cluster", "ok", {
  node_list: [node1],
  node_attr: {[node1.name]: node1Attrs},
});

export const interceptWithNodeAttrs = (
  additionalRouteList: intercept.Route[] = [],
) => {
  return shortcuts.interceptWithCluster({
    clusterStatus,
    additionalRouteList: additionalRouteList,
  });
};

export const openNodeAttrsTab = async () => {
  await page.goto(
    location.node({
      clusterName: clusterStatus.cluster_name,
      nodeName: node1.name,
    }),
  );
  await nodes.selectTab("attributes");
};
