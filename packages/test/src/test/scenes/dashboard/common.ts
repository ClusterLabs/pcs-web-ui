import * as shortcuts from "test/shortcuts";

const {item} = shortcuts.common;
export const toolbar = shortcuts.toolbar(marks.dashboard.toolbar);

const {cluster} = marks.dashboard.clusterList;

export const launchClusterItemAction = async (
  clusterName: string,
  search: (c: typeof cluster.loaded.actions) => Mark,
) => {
  const theCluster = item(cluster).byKey(c => c.name, clusterName);

  await click(theCluster.locator(c => c.loaded.actions));
  await click(theCluster.locator(c => search(c.loaded.actions)));
};
