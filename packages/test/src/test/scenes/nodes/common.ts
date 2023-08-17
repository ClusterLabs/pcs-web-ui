import * as shortcuts from "test/shortcuts";

const {nodes} = marks.cluster;

export const clusterName = "test-cluster";

export const toolbar = shortcuts.toolbar(marks.cluster.nodesToolbar);

export const goToNodes = async () => {
  await goToCluster(clusterName, tabs => tabs.nodes);
};

export const nodeListItem = (nodeName: string) =>
  shortcuts.common.item(nodes.list.node).byKey(nodes.list.node.name, nodeName);

export const openNode = async (nodeName: string) => {
  await click(nodeListItem(nodeName).locator(nodes.list.node.name));
};

export const goToNode = async (nodeName: string) => {
  await goToNodes();
  await openNode(nodeName);
};

export const currentNodeToolbar = shortcuts.toolbar(
  marks.cluster.nodes.currentNode.toolbar,
);
