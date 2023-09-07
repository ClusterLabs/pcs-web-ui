export const clusterName = "test-cluster";

export const goToResources = async () => {
  await goToCluster(clusterName, tabs => tabs.resources);
};
