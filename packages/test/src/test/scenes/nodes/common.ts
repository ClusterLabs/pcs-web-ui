const {nodes} = marks.cluster;

export const clusterName = "test-cluster";

export const goToNodes = async () => {
  await goToCluster(clusterName, tabs => tabs.nodes);
};

export const openNode = async (nodeName: string) => {
  await click(item.byName(nodes.list.node, nodeName, n => n.name));
};

export const goToNode = async (nodeName: string) => {
  await goToNodes();
  await openNode(nodeName);
};
