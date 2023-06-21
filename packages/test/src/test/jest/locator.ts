import {Locator, Page} from "playwright";

import {EnvType} from "./envType";
import {SubStructure, structure as testMarksStructure} from "./dataTest";

type LocatorArgs = Parameters<Page["locator"]>;
type WithLocator<STRUCT extends SubStructure> = {
  [KEY in keyof STRUCT]: WithLocator<STRUCT[KEY]> & {locator: Locator};
};

const testMarksToXpath = (path: string[]) =>
  `//*[@data-test="${path.join(".")}"]`;

export const getLocator =
  (envType: EnvType) =>
  (...args: LocatorArgs): Locator =>
    envType === "cockpit"
      ? page.frameLocator('[name$="/ha-cluster"]').locator(...args)
      : page.locator(...args);

const addLocators = <STRUCTURE extends SubStructure>(
  createLocator: (...args: LocatorArgs) => Locator,
  structure: STRUCTURE,
  path: string[] = [],
): WithLocator<STRUCTURE> =>
  Object.entries(structure).reduce<WithLocator<STRUCTURE>>(
    (structureWithLocators, [key, subStructure]) => ({
      ...structureWithLocators,
      [key]: addLocators(createLocator, subStructure, [...path, key]),
    }),
    (path.length > 0
      ? {locator: createLocator(testMarksToXpath(path))}
      : {}) as WithLocator<STRUCTURE>,
  );

export const getApp = (envType: EnvType) =>
  addLocators(getLocator(envType), testMarksStructure);
