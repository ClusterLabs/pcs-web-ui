import {NVPair} from "dev/types";

import {dt} from "test/tools/selectors";

export const getDisplayMap = async () => {
  return await page.$$eval(dt("nvpair-list", "^nvpair "), attrElements =>
    attrElements.map(e => ({
      name:
        e.querySelector("[data-test^='nvpair '] [data-test='name']")
          ?.textContent ?? "",
      value:
        e.querySelector("[data-test^='nvpair '] [data-test='value']")
          ?.textContent ?? "",
    })),
  );
};

export const assertDisplayedAre = async (nvPairList: NVPair[]) => {
  expect((await getDisplayMap()).map(u => [u.name, u.value])).toEqual(
    nvPairList.map(u => [u.name, u.value]),
  );
};
