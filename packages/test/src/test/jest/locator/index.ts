import type {Locator, Page} from "playwright";

import type {EnvType} from "../envType";
import {
  type SubStructure,
  markStructure as testMarksStructure,
} from "../dataTest";

type LocatorArgs = Parameters<Page["locator"]>;
type WithLocator<STRUCT extends SubStructure> = {
  [KEY in keyof STRUCT]: WithLocator<STRUCT[KEY]> & {
    locator: Locator;
    locatorRelative: Locator;
    path: string;
  };
};

export type MarkPure = {
  path: string;
  locatorRelative: Locator;
  locator: Locator;
};
export type Mark = MarkPure | Locator;
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
          locatorRelative: page.locator(testMarksToXpath(path)),
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

export const locatorRelativeFor = (mark: Mark) =>
  isLocator(mark) ? mark : mark.locatorRelative;

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

// PF6 renders dropdown/select menus in a portal outside the trigger's DOM
// subtree. Only one menu can be open at a time, so page-level locators are
// unambiguous.

export const dropdown = async (trigger: Mark | Locator, action: Mark) => {
  await (isLocator(trigger) ? trigger : locatorFor(trigger)).click();
  await locatorFor(action).click();
};

export const select = async (
  mark: Mark,
  value: string | undefined,
  nth = 0,
) => {
  await click(mark);
  await locatorFor(mark)
    .locator("xpath=/ancestor::body")
    .getByRole("option", {name: value, exact: true})
    .nth(nth)
    .click();
};

// Typeahead selects (PF6 "typeahead" MenuToggle) render their options into a
// scrollable portal menu without virtualization. With a real backend the list
// can hold dozens of agents, so the wanted option ends up below the fold. Type
// the value into the combobox input first to filter the menu down to the match.
//
// Two things make selecting the option reliably across CI composes tricky:
//
//   1. Locating it. PF6 renders the menu options as role="option" buttons under a
//      role="menu" (not role="listbox") parent. That is an invalid ARIA context,
//      and newer Chromium versions therefore omit the options from the
//      accessibility tree - so getByRole("option", {name}) matches nothing on
//      those composes even though the option is on screen. Match on the DOM
//      instead: a [role="option"] attribute selector (ignores a11y-tree validity)
//      filtered by hasText (textContent, no a11y involved).
//
//   2. Acting on it. The popper's fade/transform never settles on some composes,
//      so anything that waits for the option to be "visible" or "stable"
//      (locator.click, even with {force: true}; boundingBox; waitFor "visible")
//      times out. So wait only for "attached" and select with dispatchEvent,
//      which fires the click without any visibility/stability wait. The click is
//      retried until the menu actually closes, which verifies the selection took.
//
// Selecting via the keyboard was rejected: Enter in the combobox also submits the
// surrounding wizard step.
export const selectTypeahead = async (
  mark: Mark,
  value: string | undefined,
  nth = 0,
) => {
  await click(mark);
  if (value !== undefined) {
    await locatorFor(mark).getByRole("combobox").fill(value);
  }
  const body = () => locatorFor(mark).locator("xpath=/ancestor::body");
  const menuOptions = () => body().locator('[role="option"]');
  const wantedOption = () =>
    (value === undefined
      ? menuOptions()
      : menuOptions().filter({hasText: value})
    ).nth(nth);
  await wantedOption().waitFor({state: "attached"});
  for (let attempt = 0; attempt < 15; attempt++) {
    await wantedOption()
      .dispatchEvent("click")
      .catch(() => undefined);
    try {
      await menuOptions().first().waitFor({state: "detached", timeout: 1000});
      return;
    } catch {
      // Menu still open - the click did not register; retry.
    }
  }
  throw new Error(
    `selectTypeahead: "${value}" not selected (menu stayed open)`,
  );
};

const appConfirmTitleIs = async (title: string) =>
  await isVisible(
    marks.task.confirm.locator.locator(
      "xpath=/parent::*//*[" +
        "contains(@class, 'pf-v6-c-modal-box__title-text')" +
        ` and text()='${title}'` +
        "]",
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
  locatorFor(taskMark).locator(
    "//*[contains(@class, 'pf-v6-c-wizard__title-text')]",
  );

export const radioGroup = async (mark: Mark, value: string) => {
  await locatorFor(mark).locator(`//*[text()="${value}"]`).click();
};

export const fieldError = (mark: Mark) =>
  locatorFor(mark).locator(
    "xpath=/parent::*/descendant-or-self::*[" +
      'contains(@class, "pf-v6-m-error")' +
      ' or contains(@class, "pf-m-error")' +
      "]",
  );

export * as item from "./item";
