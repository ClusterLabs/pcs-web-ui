import {nodePageTabList} from "app/view/cluster/nodes";

import {dt} from "test/tools/selectors";

export const getNameList = async () => {
  return await page.$$eval(
    dt("cluster-nodes", "^node-list-item "),
    resourceElements =>
      resourceElements.map(
        e =>
          e.querySelector("[data-test='node-list-item-name']")?.textContent
          ?? "",
      ),
  );
};

export const assertNamesAre = async (nodeNameList: string[]) => {
  expect(await getNameList()).toEqual(nodeNameList);
};

export const selectTab = async (tabName: (typeof nodePageTabList)[number]) => {
  await page.click(dt("tabs node", tabName));
};
