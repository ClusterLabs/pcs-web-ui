import {SearchExp, item, search} from "test/shortcuts/common";

const {cluster} = marks.dashboard.clusterList;
const {node, resource, fenceDevice, issue} = cluster.loaded;

export const inCluster = (clusterName: string) => {
  const theCluster = item(cluster).byKey(cluster.name, clusterName);

  return {
    get: (searchExp: SearchExp<typeof cluster>) =>
      theCluster.locator(search(searchExp, cluster)),

    thereIs: theCluster.thereIs,

    launchAction: async (
      findAction: (actions: typeof cluster.loaded.actions) => Mark,
    ) => {
      await click(theCluster.locator(cluster.loaded.actions));
      await click(findAction(cluster.loaded.actions));
    },

    inNode: (nodeName: string) => ({
      get: (searchExp: SearchExp<typeof node>) =>
        theCluster.locator(
          item(node)
            .byKey(node.name, nodeName)
            .locator(search(searchExp, node)),
        ),
    }),

    inResource: (resourceId: string) => ({
      get: (searchExp: SearchExp<typeof resource>) =>
        theCluster.locator(
          item(resource)
            .byKey(resource.id, resourceId)
            .locator(search(searchExp, resource)),
        ),
    }),

    inFenceDevice: (fenceDeviceId: string) => ({
      get: (searchExp: SearchExp<typeof fenceDevice>) =>
        theCluster.locator(
          item(fenceDevice)
            .byKey(fenceDevice.id, fenceDeviceId)
            .locator(search(searchExp, fenceDevice)),
        ),
    }),

    inIssue: (index: number) => ({
      get: (searchExp: SearchExp<typeof issue>) =>
        theCluster.locator(
          item(issue).byIndex(index).locator(search(searchExp, issue)),
        ),
    }),
  };
};
