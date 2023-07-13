import {Locator, Page} from "playwright";

import {EnvType} from "./envType";
import {SubStructure, structure as testMarksStructure} from "./dataTest";

type LocatorArgs = Parameters<Page["locator"]>;
type WithLocator<STRUCT extends SubStructure> = {
  [KEY in keyof STRUCT]: WithLocator<STRUCT[KEY]> & {
    locator: Locator;
    path: string;
  };
};

export type Mark = {locator: Locator} | Locator;
const testMarksToXpath = (path: string[]) =>
  `//*[@data-test="${path.join(".")}"]`;

const getLocator =
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
      ? {
          locator: createLocator(testMarksToXpath(path)),
          path: path.join("."),
        }
      : {}) as WithLocator<STRUCTURE>,
  );

export const getApp = (envType: EnvType) =>
  addLocators(getLocator(envType), testMarksStructure);

export const isLocator = (mark: Mark): mark is Locator =>
  typeof mark.locator === "function";

export const locatorFor = (mark: Mark) =>
  isLocator(mark) ? mark : mark.locator;

export const click = async (mark: Mark) => {
  await locatorFor(mark).click();
};

export const isVisible = async (mark: Mark) => {
  await locatorFor(mark).waitFor({state: "visible"});
};

export const isAbsent = async (mark: Mark) => {
  await locatorFor(mark).waitFor({state: "detached"});
};

export const fill = async (mark: Mark, value: string) => {
  await locatorFor(mark).fill(value);
};
