import {primitivePageTabList} from "app/view/cluster/resources";

import {dt} from "test/tools/selectors";

export const getNameList = async () => {
  return await page.$$eval(
    dt("cluster-resources", "^resource-tree-item "),
    resourceElements =>
      resourceElements.map(
        e =>
          e.querySelector("[data-test='resource-tree-item-name']")
            ?.textContent ?? "",
      ),
  );
};

export const assertNamesAre = async (resourceNameList: string[]) => {
  expect(await getNameList()).toEqual(resourceNameList);
};

export const selectTab = async (
  tabName: typeof primitivePageTabList[number],
) => {
  await page.click(dt("tabs primitive", tabName));
};
