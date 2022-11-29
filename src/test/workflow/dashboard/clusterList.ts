import {dt} from "test/tools/selectors";

export const waitForLoaded = async () =>
  await page.waitForSelector(dt("cluster-list"));

export const getNameList = async () => {
  return await page.$$eval(dt("cluster-list", "^cluster "), clusterElements =>
    clusterElements.map(
      e =>
        e.querySelector("[data-test='name']")?.textContent?.split(" ")[0] ?? "",
    ),
  );
};

export const goToCluster = async (clusterName: string) => {
  const clusterList = await getNameList();
  expect(clusterList).toContain(clusterName);
  await page.click(
    dt("cluster-list", `cluster ${clusterName}`, "name", "link"),
  );
};

export const assertNamesAre = async (clusterNameList: string[]) => {
  expect(await getNameList()).toEqual(clusterNameList);
};
