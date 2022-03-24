import { Primitive } from "dev/types";

import { dt } from "test/tools/selectors";

export const getDisplayMap = async () => {
  return await page.$$eval(
    dt("^resource-detail ", "utilization-attr-list", "^utilization-attr "),
    attrElements =>
      attrElements.map(e => ({
        name:
          e.querySelector("[data-test^='utilization-attr '] [data-test='name']")
            ?.textContent ?? "",
        value:
          e.querySelector(
            "[data-test^='utilization-attr '] [data-test='value']",
          )?.textContent ?? "",
      })),
  );
};

export const assertDisplayedAre = async (
  utilizationAttrs: Primitive["utilization"],
) => {
  expect((await getDisplayMap()).map(u => [u.name, u.value])).toEqual(
    utilizationAttrs.map(u => [u.name, u.value]),
  );
};
