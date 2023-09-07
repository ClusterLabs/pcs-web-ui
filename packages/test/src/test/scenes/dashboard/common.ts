const {cluster} = marks.dashboard.clusterList;

export const launchClusterItemAction = async (
  clusterName: string,
  search: (c: typeof cluster.actions) => Mark,
) => {
  await click(
    item.byName(cluster, clusterName, [c => c.actions, c => search(c.actions)]),
  );
};
