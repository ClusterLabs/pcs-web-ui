const {cluster} = marks.dashboard.clusterList;

export const launchClusterItemAction = async (
  clusterName: string,
  search: (c: typeof cluster.loaded.actions) => Mark,
) => {
  await click(
    item.byName(cluster, clusterName, [
      c => c.loaded.actions,
      c => search(c.loaded.actions),
    ]),
  );
};
