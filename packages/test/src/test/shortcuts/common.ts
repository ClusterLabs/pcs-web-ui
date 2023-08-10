import {Locator} from "playwright";

import {textIs} from "./expect";

export type SearchExp<MARK_PART extends Mark> =
  | Mark
  | ((markPart: MARK_PART) => Mark);

export const search = <MARK_PART extends Mark>(
  mark: SearchExp<MARK_PART>,
  markPart: MARK_PART,
) => locatorFor(typeof mark === "function" ? mark(markPart) : mark);

const ancestor = (mark: {path: string}) =>
  `xpath=/ancestor::node()[@data-test="${mark.path}"]`;

export const item = <ITEM_MARK extends {path: string; locator: Locator}>(
  itemMark: ITEM_MARK,
) => ({
  byKey: (keyMark: Mark, key: string) => {
    const theItem = locatorFor(keyMark)
      .getByText(key, {exact: true})
      .locator(ancestor(itemMark));

    return {
      locator: (searchExp?: SearchExp<ITEM_MARK>) =>
        searchExp === undefined
          ? theItem
          : theItem.locator(locatorFor(search(searchExp, itemMark))),

      thereIs: async (searchExp: SearchExp<ITEM_MARK>, value: string) => {
        await textIs(
          theItem.locator(locatorFor(search(searchExp, itemMark))),
          value,
        );
      },
    };
  },
  byIndex: (index: number) => {
    const theItem = itemMark.locator.nth(index);

    return {
      locator: (searchExp?: SearchExp<ITEM_MARK>) =>
        searchExp === undefined
          ? theItem
          : theItem.locator(locatorFor(search(searchExp, itemMark))),
    };
  },
});
