const {cluster} = app.dashboard.clusterList;
const {loaded} = cluster;

type OverloadedMark<MARK_PART extends Mark> =
  | Mark
  | ((markPart: MARK_PART) => Mark);

const getLocator = <MARK_PART extends Mark>(
  mark: OverloadedMark<MARK_PART>,
  markPart: MARK_PART,
) => {
  const plainMark = typeof mark === "function" ? mark(markPart) : mark;
  return isLocator(plainMark) ? plainMark : plainMark.locator;
};

const ancestor = (suffix: string) =>
  `xpath=/ancestor::node()[@data-test="dashboard.clusterList.${suffix}"]`;

export const inCluster =
  (clusterName: string) => (mark: OverloadedMark<typeof cluster>) => {
    return cluster.name.locator
      .getByText(clusterName)
      .locator(ancestor("cluster"))
      .locator(getLocator(mark, cluster));
  };

export const inClusterNode =
  (clusterName: string) =>
  (nodeName: string) =>
  (mark: OverloadedMark<typeof loaded.nodes.list.node>) =>
    inCluster(clusterName)(loaded.nodes.list.node.name)
      .getByText(nodeName)
      .locator(ancestor("cluster.loaded.nodes.list.node"))
      .locator(getLocator(mark, loaded.nodes.list.node));

export const inClusterResource =
  (clusterName: string) =>
  (resourceId: string) =>
  (mark: OverloadedMark<typeof loaded.resources.list.resource>) =>
    inCluster(clusterName)(loaded.resources.list.resource.id)
      .getByText(resourceId)
      .locator(ancestor("cluster.loaded.resources.list.resource"))
      .locator(getLocator(mark, loaded.resources.list.resource));

export const inClusterFenceDevice =
  (clusterName: string) =>
  (fenceDeviceId: string) =>
  (mark: OverloadedMark<typeof loaded.fenceDevices.list.fenceDevice>) =>
    inCluster(clusterName)(loaded.fenceDevices.list.fenceDevice.id)
      .getByText(fenceDeviceId)
      .locator(ancestor("cluster.loaded.fenceDevices.list.fenceDevice"))
      .locator(getLocator(mark, loaded.fenceDevices.list.fenceDevice));
