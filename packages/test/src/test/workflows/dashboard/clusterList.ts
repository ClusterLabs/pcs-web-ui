const getNameList = async () =>
  await dataTest("dashboard.clusterList.cluster.name").evaluateAll(
    (nodeList: HTMLElement[]) => nodeList.map(n => n.innerText),
  );

export const waitForLoaded = async () =>
  await dataTest("dashboard.clusterList").waitFor();

export const assertNamesAre = async (clusterNameList: string[]) => {
  expect(await getNameList()).toEqual(clusterNameList);
};
