import * as cs from "dev/responses/clusterStatus/tools";

import {assert, mock} from "test/tools";

import {clusterName, goToNode} from "./common";

const {tabs, utilization} = marks.cluster.nodes.currentNode;

export const node1 = cs.node("1");
const util_1 = {id: "N1_test_one", name: "test_one", value: "100"};
const util_2 = {id: "N1_test_two", name: "test_two", value: "200"};
export const utilizationList = [
  {id: "N1_test_one", name: "test_one", value: "100"},
  {id: "N1_test_two", name: "test_two", value: "200"},
];

describe("Primitive meta attributes view", () => {
  it("should render meta attributes", async () => {
    mock.shortcuts.withCluster({
      clusterStatus: cs.cluster(clusterName, "ok", {
        node_list: [node1],
        nodes_utilization: {[node1.name]: [util_1, util_2]},
      }),
    });

    await goToNode(node1.name);
    await click(tabs.utilization);

    await assert.countIs(utilization.pair, 2);
    await assert.nvPairIs(utilization.pair, util_1.name, util_1.value);
    await assert.nvPairIs(utilization.pair, util_2.name, util_2.value);
  });
});
