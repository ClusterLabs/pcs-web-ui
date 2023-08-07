import {Locator} from "playwright";

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
      locator: (mark: Mark) => theItem.locator(locatorFor(mark)),
    };
  },
  byIndex: (index: number) => {
    const theItem = itemMark.locator.nth(index);

    return {
      locator: (search: (_itemMark: ITEM_MARK) => Mark) =>
        theItem.locator(locatorFor(search(itemMark))),
    };
  },
});
