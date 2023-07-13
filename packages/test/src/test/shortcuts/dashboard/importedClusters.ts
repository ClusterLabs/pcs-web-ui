const {cluster} = app.dashboard.clusterList;
const {node} = cluster.loaded.nodes.list;
const {resource} = cluster.loaded.resources.list;
const {fenceDevice} = cluster.loaded.fenceDevices.list;

type SearchExp<MARK_PART extends Mark> = Mark | ((markPart: MARK_PART) => Mark);

const search = <MARK_PART extends Mark>(
  mark: SearchExp<MARK_PART>,
  markPart: MARK_PART,
) => locatorFor(typeof mark === "function" ? mark(markPart) : mark);

const ancestor = (mark: {path: string}) =>
  `xpath=/ancestor::node()[@data-test="${mark.path}"]`;

const item = (itemMark: {path: string}) => ({
  byKey: (keyMark: Mark, key: string) =>
    locatorFor(keyMark).getByText(key).locator(ancestor(itemMark)),
});

export const inCluster = (clusterName: string) => {
  const theCluster = item(cluster).byKey(cluster.name, clusterName);

  return {
    get: (searchExp: SearchExp<typeof cluster>) =>
      theCluster.locator(search(searchExp, cluster)),

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
  };
};

export const expectNamesAre = async (clusterNameList: string[]) => {
  expect(
    await app.dashboard.clusterList.cluster.name.locator.evaluateAll(
      (nodeList: HTMLElement[]) => nodeList.map(n => n.innerText),
    ),
  ).toEqual(clusterNameList);
};
