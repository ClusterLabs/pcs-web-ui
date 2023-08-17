import * as shortcuts from "test/shortcuts";

export const clusterName = "test-cluster";
export const toolbar = shortcuts.toolbar(marks.cluster.resourcesToolbar);

export const goToResources = async () => {
  await goToCluster(clusterName, tabs => tabs.resources);
};
