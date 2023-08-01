export const fillClusterNameAndNodes = async ({
  clusterName,
  nodeNameList,
}: {
  clusterName: string;
  nodeNameList: string[];
}) => {
  const {nameAndNodes} = marks.task.clusterSetup;
  await nameAndNodes.clusterName.locator.fill(clusterName);
  for (let i = 0; i < nodeNameList.length; i++) {
    // WARNING: only up to 3 nodes
    // TODO: add more nodes if required
    await nameAndNodes.node.name.locator.nth(i).fill(nodeNameList[i]);
  }
};
