import * as cs from "dev/responses/clusterStatus/tools";

import {assert, mock} from "test/tools";

import {clusterName, goToNode} from "./common";

const {tabs, attributes} = marks.cluster.nodes.currentNode;

export const node1 = cs.node("1");
const nodeAttr_1 = {id: "N1_attr_one", name: "attr_one", value: "one"};
const nodeAttr_2 = {id: "N1_attr_two", name: "attr_two", value: "to"};

describe("Node attributes view", () => {
  it("should render node attributes", async () => {
    mock.shortcuts.withCluster({
      clusterStatus: cs.cluster(clusterName, "ok", {
        node_list: [node1],
        node_attr: {[node1.name]: [nodeAttr_1, nodeAttr_2]},
      }),
    });

    await goToNode(node1.name);
    await click(tabs.attributes);
    await assert.countIs(attributes.pair, 2);

    await assert.nvPairIs(attributes.pair, nodeAttr_1.name, nodeAttr_1.value);
    await assert.nvPairIs(attributes.pair, nodeAttr_2.name, nodeAttr_2.value);
  });
});
