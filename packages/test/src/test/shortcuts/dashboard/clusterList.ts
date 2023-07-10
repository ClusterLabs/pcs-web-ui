export const inCluster = (clusterName: string) => (mark: Mark) =>
  app.dashboard.clusterList.cluster.name.locator
    .getByText(clusterName)
    .locator(
      'xpath=/ancestor::node()[@data-test="dashboard.clusterList.cluster"]',
    )
    .locator(isLocator(mark) ? mark : mark.locator);

export const inClusterNode =
  (clusterName: string) => (nodeName: string) => (mark: Mark) =>
    inCluster(clusterName)(
      app.dashboard.clusterList.cluster.loaded.nodes.list.node.name,
    )
      .getByText(nodeName)
      .locator(
        'xpath=/ancestor::node()[@data-test="'
          + "dashboard.clusterList.cluster.loaded.nodes.list.node"
          + '"]',
      )
      .locator(isLocator(mark) ? mark : mark.locator);

export const inClusterResource =
  (clusterName: string) => (resourceId: string) => (mark: Mark) =>
    inCluster(clusterName)(
      app.dashboard.clusterList.cluster.loaded.resources.list.resource.id,
    )
      .getByText(resourceId)
      .locator(
        'xpath=/ancestor::node()[@data-test="'
          + "dashboard.clusterList.cluster.loaded.resources.list.resource"
          + '"]',
      )
      .locator(isLocator(mark) ? mark : mark.locator);

export const inClusterFenceDevice =
  (clusterName: string) => (fenceDeviceId: string) => (mark: Mark) =>
    inCluster(clusterName)(
      app.dashboard.clusterList.cluster.loaded.fenceDevices.list.fenceDevice.id,
    )
      .getByText(fenceDeviceId)
      .locator(
        'xpath=/ancestor::node()[@data-test="'
          + "dashboard.clusterList.cluster.loaded.fenceDevices.list.fenceDevice"
          + '"]',
      )
      .locator(isLocator(mark) ? mark : mark.locator);
