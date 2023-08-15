import * as cs from "dev/responses/clusterStatus/tools";

import {intercept} from "test/tools";
import * as shortcuts from "test/shortcuts";

import {clusterName, goToNode} from "./common";

const {countIs} = shortcuts.expect;
const {item} = shortcuts.common;
const {tabs, utilization} = marks.cluster.nodes.currentNode;

export const node1 = cs.node("1");
export const utilizationList = [
  {id: "N1_test_one", name: "test_one", value: "100"},
  {id: "N1_test_two", name: "test_two", value: "200"},
];

describe("Primitive meta attributes view", () => {
  it("should render meta attributes", async () => {
    intercept.shortcuts.interceptWithCluster({
      clusterStatus: cs.cluster(clusterName, "ok", {
        node_list: [node1],
        nodes_utilization: {[node1.name]: utilizationList},
      }),
    });

    await goToNode(node1.name);
    await click(tabs.utilization);

    await countIs(utilization.pair, 2);
    await item(utilization.pair)
      .byKey(pair => pair.name, utilizationList[0].name)
      .thereIs(pair => pair.value, utilizationList[0].value);
    await item(utilization.pair)
      .byKey(pair => pair.name, utilizationList[1].name)
      .thereIs(pair => pair.value, utilizationList[1].value);
  });
});
