const getNameList = async () =>
  await dataTest("dashboard.cluster-list.cluster.name").evaluateAll(
    (nodeList: HTMLElement[]) => nodeList.map(n => n.innerText),
  );

export const waitForLoaded = async () =>
  await dataTest("dashboard.cluster-list").waitFor();

export const assertNamesAre = async (clusterNameList: string[]) => {
  expect(await getNameList()).toEqual(clusterNameList);
};
