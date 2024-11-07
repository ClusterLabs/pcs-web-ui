export const clusterName = "test-cluster";

export const goToResources = async () => {
  await goToCluster(clusterName, tabs => tabs.resources);
};

export const openGroup = async (id: string) => {
  await click(item.byId(marks.cluster.resources.tree.group, id, g => g.id));
};

export const openClone = async (id: string) => {
  await click(item.byId(marks.cluster.resources.tree.clone, id, c => c.id));
};
