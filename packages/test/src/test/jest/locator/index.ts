import {Locator, Page} from "playwright";

import {EnvType} from "../envType";
import {SubStructure, markStructure as testMarksStructure} from "../dataTest";

type LocatorArgs = Parameters<Page["locator"]>;
type WithLocator<STRUCT extends SubStructure> = {
  [KEY in keyof STRUCT]: WithLocator<STRUCT[KEY]> & {
    locator: Locator;
    path: string;
  };
};

export type Mark = {locator: Locator; path: string} | Locator;
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

export const click = async (mark: Mark | Mark[]) => {
  const markList = Array.isArray(mark) ? mark : [mark];
  for (let i = 0; i < markList.length; i++) {
    await locatorFor(markList[i]).click();
  }
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

// The following functions deal with some patternfly inaccessibilites

export const select = async (
  mark: Mark,
  value: string | undefined,
  nth = 0,
) => {
  await click(mark);
  await locatorFor(mark).locator(`//*[text()="${value}"]`).nth(nth).click();
};

const appConfirmTitleIs = async (title: string) =>
  await isVisible(
    marks.task.confirm.locator.locator(
      "xpath=/parent::*//*["
        + "contains(@class, 'pf-c-modal-box__title-text')"
        + ` and text()='${title}'`
        + "]",
    ),
  );
export const appConfirm = {
  titleIs: appConfirmTitleIs,
  run: async (title: string) => {
    await appConfirmTitleIs(title);
    await click(marks.task.confirm.run);
    await isAbsent(marks.task.confirm);
  },
  cancel: async (title: string) => {
    await appConfirmTitleIs(title);
    await click(marks.task.confirm.cancel);
    await isAbsent(marks.task.confirm);
  },
};

export const taskTitle = (taskMark: Mark) =>
  locatorFor(taskMark).locator("//*[contains(@class, 'pf-c-wizard__title')]");

export const radioGroup = async (mark: Mark, value: string) => {
  await locatorFor(mark).locator(`//*[text()="${value}"]`).click();
};

export const getToggle = (mark: Mark) =>
  locatorFor(mark).locator("xpath=/parent::*");

export const toggle = async (mark: Mark) => {
  await getToggle(mark).click();
};

export const fieldError = (mark: Mark) =>
  locatorFor(mark).locator(
    'xpath=/following-sibling::*[contains(@class, "pf-m-error")]',
  );

export * as item from "./item";
