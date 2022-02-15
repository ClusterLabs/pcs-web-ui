import { dt } from "test/tools/selectors";

export const waitForLoaded = async () =>
  await page.waitForSelector(dt("cluster-list"));

export const getNameList = async () => {
  return await page.$$eval(dt("cluster-list", "^cluster "), clusterElements =>
    clusterElements.map(
      e => e.querySelector("[data-test='name']")?.textContent ?? "",
    ),
  );
};
