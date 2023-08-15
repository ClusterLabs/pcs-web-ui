import * as cs from "dev/responses/clusterStatus/tools";

import {intercept} from "test/tools";
import * as shortcuts from "test/shortcuts";

import {clusterName, goToNode} from "./common";

const {countIs} = shortcuts.expect;
const {item} = shortcuts.common;
const {tabs, attributes} = marks.cluster.nodes.currentNode;

const nodeName = "node-1";

export const node1 = cs.node("1");
export const node1Attrs = [
  {id: "N1_attr_one", name: "attr_one", value: "one"},
  {id: "N1_attr_two", name: "attr_two", value: "to"},
];

describe("Node attributes view", () => {
  it("should render node attributes", async () => {
    intercept.shortcuts.interceptWithCluster({
      clusterStatus: cs.cluster(clusterName, "ok", {
        node_list: [node1],
        node_attr: {[node1.name]: node1Attrs},
      }),
    });

    await goToNode(nodeName);
    await click(tabs.attributes);
    await countIs(attributes.pair, 2);
    await item(attributes.pair)
      .byKey(pair => pair.name, node1Attrs[0].name)
      .thereIs(pair => pair.value, node1Attrs[0].value);
  });
});
