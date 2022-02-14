import { dt } from "test/tools/selectors";

export const waitForClusterListLoaded = async () => {
  await page.waitForSelector(dt("cluster-list"));
};

export const getClusterNameList = async () => {
  return await page.$$eval(dt("cluster-list", "^cluster "), clusterElements =>
    clusterElements.map(
      e => e.querySelector("[data-test='name']")?.textContent ?? "",
    ),
  );
};
